import React, { useId, useRef, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

import { format } from "date-fns";

import Image from "next/image";
import { imagePaths, whileTapOptions } from "@/constants";
import { motion } from "framer-motion";
import { cn } from "@/lib";

import { useDropzone } from "react-dropzone";
import { Formik, Form, FieldArray, ErrorMessage, useField } from "formik";

import * as Yup from "yup";

import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";

const startPollTextColors =
  "text-transparent bg-gradient-to-b bg-clip-text from-primary-600 to-secondary-600 group-hover/create-poll-btn:from-primary-50 group-hover/create-poll-btn:to-secondary-50 transition-all duration-300 will-change-auto";

const validationSchema = Yup.object().shape({
  stations: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required("Station label is required"),
        options: Yup.array()
          .of(
            Yup.object().shape({
              type: Yup.string()
                .oneOf(
                  ["text", "image"],
                  'Type must be either "text" or "image"'
                )
                .required("Option type is required"),
              value: Yup.string().when("type", (type, schema) => {
                return type[0] === "text"
                  ? schema.required("Option text is required")
                  : schema.notRequired();
              }),
              file: Yup.mixed().when("type", (type, schema) => {
                return type[0] === "image"
                  ? schema.required("Option image is required")
                  : schema.notRequired();
              }),
            })
          )
          .min(2, "At least 2 options are required")
          .max(6, "No more than 6 options are allowed"),
      })
    )
    .min(1, "At least 1 station is required")
    .max(10, "No more than 10 stations are allowed"),
  pollVisibility: Yup.object().shape({
    type: Yup.string()
      .oneOf(
        ["everyone", "restricted", "manual"],
        'Type must be "everyone", "restricted", or "manual"'
      )
      .required("Poll visibility type is required"),
    locations: Yup.array().when("type", {
      is: "restricted",
      then: (schema) =>
        schema
          .of(Yup.string())
          .min(1, "At least one location is required")
          .required("Locations are required when visibility is restricted"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
});

type Option = {
  type: string;
  value: any;
};

type Station = {
  label: string;
  options: Option[];
};

type PollVisibility = {
  type: "everyone" | "restricted" | "manual";
  locations: string[];
};

type FormValues = {
  expiresAt: string;
  stations: Station[];
  pollDescription: string;
  pollVisibility: PollVisibility;
};

type TimeInput = {
  hours?: number;
  minutes?: number;
};

const CreatePandarPollDialog = () => {
  return (
    <>
      <DialogContent className="sm:max-w-[425px] md:max-w-[50vw] bg-sitywatch-bg bg-cover bg-center !rounded-2xl overflow-y-auto max-h-[80vh]">
        <DialogHeader className="flex flex-row gap-x-2 items-start z-10 p-4">
          <div className="size-12 md:size-14 relative overflow-hidden">
            <Image
              src={imagePaths.PANDAR}
              alt="Pandar"
              layout="fill"
              quality={100}
              objectFit="contain"
            />
          </div>

          <div className="flex flex-col gap-y-0.5">
            <DialogTitle className="text-grayRed-950 text-base font-bold">
              Create Your Pandar Poll
            </DialogTitle>
            <DialogDescription className="text-grayRed-950/65 text-sm">
              Your poll will vanish after 24 hours, keeping things fun and
              fleeting!
            </DialogDescription>
          </div>
        </DialogHeader>

        <CreatePandarPollDialogFormik />
      </DialogContent>
    </>
  );
};

const FileUpload = (props: any) => {
  const { required, name } = props;

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const [field, utils, helpers] = useField(name);
  const { setValue } = helpers;

  // const onDrop = (acceptedFiles: File[]) => {
  //   if (acceptedFiles.length > 0) {
  //     setValue(acceptedFiles[0]);
  //   }
  // };

  const { getRootProps, getInputProps, open, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop: (incomingFiles: File[]) => {
        if (hiddenInputRef.current) {
          const dataTransfer = new DataTransfer();

          incomingFiles.forEach((v) => {
            dataTransfer.items.add(v);
          });

          hiddenInputRef.current.files = dataTransfer.files;
        }
      },
      maxFiles: 1,
      maxSize: 500 * 1024,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/webp": [],
        "image/jpg": [],
      },
    });

  return (
    <div className="group/drop-zone w-full min-h-20 p-0.5 bg-gradient-to-br from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-xl">
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`w-full min-h-full p-2 rounded-xl grid place-items-center group-hover/drop-zone:rounded-[10px] relative focus:rounded-[10px] resize-none shadow-inner text-grayRed-950/85 text-[15px] leading-[23px] backdrop-blur backdrop-filter focus:outline-none ${
          isDragActive
            ? "bg-gradient-to-br from-primary-200/80 to-secondary-200/80"
            : "bg-white/85"
        }`}
      >
        <input
          type="file"
          name={name}
          required={required}
          style={{ opacity: 0 }}
          ref={hiddenInputRef}
        />

        <input {...getInputProps()} />

        {isDragActive ? (
          <p className="text-sm text-transparent bg-gradient-to-b bg-clip-text from-primary-600 to-secondary-600 absolute transition-all duration-300">
            Drop your file here...
          </p>
        ) : (
          <p className="text-sm text-secondary-600 absolute transition-all duration-300">
            Drag & drop a file here, or click to select a file
          </p>
        )}
      </div>
    </div>
  );
};

const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

const CreatePandarPollDialogFormik = () => {
  const [query, setQuery] = useState("");

  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);

  const addHoursAndMinutes = (
    time: TimeInput = { hours: 23, minutes: 59 }
  ): string => {
    const now = new Date();
    const { hours = 23, minutes = 59 } = time;

    if (hours < 0 || minutes < 0) {
      throw new Error("Hours and minutes must be non-negative numbers.");
    }

    now.setHours(now.getHours() + hours);
    now.setMinutes(now.getMinutes() + minutes);

    return now.toISOString();
  };

  const getTimeDifference = (
    expiresAt: string
  ): { hours: number; minutes: number } => {
    const now = new Date();
    const expiresAtDate = new Date(expiresAt);

    const diffInMilliseconds = expiresAtDate.getTime() - now.getTime();
    if (diffInMilliseconds < 0) {
      throw new Error("expiresAt cannot be in the past.");
    }

    const totalMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
  };

  const handleTimeChange = debounce((setFieldValue, field, value) => {
    const updatedValue = Math.max(
      0,
      Math.min(field === "hours" ? 23 : 59, parseInt(value, 10) || 0)
    );

    const newExpiresAt = addHoursAndMinutes({
      [field]: updatedValue,
    });

    setFieldValue("expiresAt", newExpiresAt);
  }, 300);

  return (
    <Formik<FormValues>
      initialValues={{
        pollDescription: "",
        pollVisibility: {
          type: "everyone",
          locations: [],
        },
        expiresAt: addHoursAndMinutes(),
        stations: [{ label: "", options: [{ type: "text", value: null }] }],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log({ values });
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className="grid gap-4 py-4">
          <div className="flex flex-col gap-y-1 w-full">
            <label
              htmlFor="poll-description"
              className="font-bold text-base text-secondary"
            >
              Poll Description (Optional)
            </label>

            <small className="text-grayRed-950/65 text-sm">
              Add a brief note or explanation to let participants know what your
              poll is about.
            </small>

            <div className="group/textarea w-full min-h-20 p-0.5 bg-gradient-to-br from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-xl mt-2">
              <textarea
                id="poll-description"
                name="pollDescription"
                rows={3}
                onChange={handleChange}
                value={values.pollDescription}
                className="w-full min-h-full p-2 rounded-xl group-hover/textarea:rounded-[10px] focus:rounded-[10px] resize-none shadow-inner text-grayRed-950/85 text-[15px] leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-1 w-full">
            <label
              htmlFor="poll-description"
              className="font-bold text-base text-secondary"
            >
              Poll Duration
            </label>

            <small className="text-grayRed-950/65 text-sm">
              Set the expiration duration for your Pandar Poll. The default
              duration is 24 hours, and you can adjust it as needed up to a
              maximum of 24 hours.
            </small>

            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="min-w-32 min-h-10 p-2 text-sm rounded-[10px] flex items-center space-x-1 cursor-not-allowed shadow-[0px_0px_0px_1px_rgb(163_138_138/0.3)] text-grayRed-950/85 leading-[23px] focus:outline-none select-none">
                <span className="material-symbols-outlined text-transparent bg-gradient-to-b bg-clip-text from-primary to-secondary text-[18px] lg:text-[20px]">
                  calendar_month
                </span>
                <span className="text-transparent bg-gradient-to-b bg-clip-text from-primary-600 to-secondary-600">
                  {format(new Date(values.expiresAt), "PPpp")}
                </span>
              </div>

              <div className="min-h-10 min-w-32 flex items-center gap-x-0.5 rounded-xl px-2 py-1 shadow-[0px_0px_0px_1px_rgb(163_138_138/0.3)]">
                <span className="text-sm mr-1.5 text-transparent bg-gradient-to-b bg-clip-text from-primary-600 to-secondary-600">
                  Set Time
                </span>

                <div className="group/time-picker h-full w-10 grid grid-cols-1 p-0.5 bg-gradient-to-br from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-lg">
                  <input
                    ref={hoursRef}
                    type="number"
                    min={0}
                    max={23}
                    maxLength={2}
                    placeholder="HH"
                    onChange={(e) =>
                      handleTimeChange(setFieldValue, "hours", e.target.value)
                    }
                    className="w-full h-full px-1 py-0.5 text-center text-grayRed-950/85 placeholder:text-grayRed-950/40 rounded-md text-sm resize-none shadow-inner text-grayRed-950/85 leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none"
                  />
                </div>

                <span className="text-[18px] relative -translate-y-[1.25px] text-transparent font-extrabold bg-gradient-to-b bg-clip-text from-primary to-secondary">
                  :
                </span>

                <div className="group/time-picker h-full w-10 grid grid-cols-1 p-0.5 bg-gradient-to-br from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-lg">
                  <input
                    max={59}
                    maxLength={2}
                    type="number"
                    placeholder="MM"
                    ref={minutesRef}
                    min={new Date(values.expiresAt).getHours() === 0 ? 1 : 0}
                    onChange={(e) =>
                      handleTimeChange(setFieldValue, "minutes", e.target.value)
                    }
                    className="w-full h-full px-1 py-0.5 text-center rounded-md text-grayRed-950/85 placeholder:text-grayRed-950/40 text-sm resize-none shadow-inner text-grayRed-950/85 leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-1 w-full">
            <label
              htmlFor="poll-description"
              className="font-bold text-base text-secondary"
            >
              Poll Visibility
            </label>

            <small className="text-grayRed-950/65 text-sm">
              Determine who can see this poll. Choose between making it visible
              to everyone or restricting it to specific countries, states, or
              cities.
            </small>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-4 mt-2">
              <div className="cols-span-1 flex flex-col gap-y-2 w-full">
                <Select
                  name="pollVisibility.type"
                  onValueChange={(value) =>
                    setFieldValue("pollVisibility.type", value)
                  }
                  defaultValue={values.pollVisibility.type}
                >
                  <div className="group/select w-full p-0.5 bg-gradient-to-br from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-xl">
                    <SelectTrigger className="w-full min-h-[42px] !p-2 !px-3 rounded-xl group-hover/select:rounded-[10px] focus:rounded-[10px] shadow-inner text-grayRed-950/85 text-sm lg:text-[15px] leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none">
                      <SelectValue placeholder="Select Poll Visiblity" />
                    </SelectTrigger>
                  </div>
                  <SelectContent className="bg-sitywatch-bg bg-cover bg-center bg-no-repeat text-grayRed-950 border-[rgb(163_138_138/0.3)]">
                    <SelectGroup>
                      <SelectLabel>Visibility Options</SelectLabel>
                      <SelectItem value="everyone">Everyone</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <ErrorMessage
                  name={`pollVisibility.type`}
                  component="small"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="col-span-1 flex flex-col gap-y-2 w-full">
                <Combobox onClose={() => setQuery('')} onChange={(e) => { console.log(e) }}>
                  <div className="group/combobox w-full min-h-[42px] p-0.5 bg-gradient-to-br grid grid-cols-1 from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-xl relative">
                    <ComboboxInput
                      name={`pollVisibility.locations`}
                      aria-label="Poll Visibility Locations"
                      placeholder="Start typing to add locations..."
                      onChange={(event) => setQuery(event.target.value)}
                      className={cn(
                        "w-full min-h-full p-2 px-3 rounded-xl group-hover/combobox:rounded-[10px] focus:rounded-[10px] shadow-inner text-grayRed-950/85 placeholder:text-grayRed-950/40 placeholder:opacity-95 text-sm lg:text-[15px] leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none"
                      )}
                    />

                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-transparent bg-gradient-to-br bg-clip-text from-primary to-secondary text-[18px] md:text-[20px]">
                      travel_explore
                    </span>
                  </div>

                  <ComboboxOptions
                    anchor="bottom"
                    className="border border-[rgb(163_138_138/0.3)] empty:invisible absolute !z-[9999] bg-sitywatch-bg bg-cover bg-center text-sm bg-no-repeat min-w-64 max-w-80 rounded-lg shadow-lg text-grayRed-950 !overflow-y-auto overflow-x-hidden"
                  >
                    {locations.map((location) => (
                      <ComboboxOption
                        key={useId()}
                        value={location}
                        className="group flex gap-2 bg-transparent data-[focus]:bg-primary-100/55 hover:bg-primary-100/45 py-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined size-4 text-transparent bg-gradient-to-b bg-clip-text from-primary-600 to-secondary-600 text-[20px]">
                          check
                        </span>
                        <span>{location}</span>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Combobox>

                <ErrorMessage
                  name={`pollVisibility.locations`}
                  component="small"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div
              className={cn(
                "w-full min-h-10 flex flex-row items-center flex-wrap gap-x-2 p-2 relative rounded-xl shadow-[0px_0px_0px_1px_rgb(163_138_138/0.3)] mt-2 opacity-100",
                values.pollVisibility.type !== "restricted" &&
                  "opacity-0 hidden"
              )}
            >
              {/* <motion.button { ...whileTapOptions } type="button" className="group/chip rounded-full py-1.5 px-3 flex items-center space-x-2 text-sm bg-gradient-to-b from-grayRed-200 to-grayRed/50 text-grayRed-950 shadow-inner hover:shadow-primary-700/40 transition-all duration-300 will-change-auto transform-gpu">
                <span className="text-inherit">Jos</span>
                <span  className="material-symbols-outlined text-inherit text-[18px] lg:text-[20px] scale-100 group-hover/chip:scale-110 transition-all duration-300 will-change-auto transform-gpu group-hover/chip:text-primary">do_not_disturb_on</span>
              </motion.button> */}

              <p
                className={cn(
                  "text-sm absolute top-1/2 left-1/2 w-full 2xl:w-[80%] text-grayRed-950/65 text-center -translate-y-[50%] -translate-x-[50%] opacity-100 transition-all duration-300 will-change-auto",
                  !isEmpty(values.pollVisibility.locations) &&
                    "opacity-0 hidden"
                )}
              >
                No locations selected. Choose countries, states, or cities to
                target your audience.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-grayRed/20 my-1"></div>

          <FieldArray name="stations">
            {({ push, remove, move }) => (
              <>
                {values.stations.map(
                  (
                    station: { label: string; options: Option[] },
                    stationIndex: number
                  ) => (
                    <div className="flex flex-col gap-y-1 w-full shadow-[0px_0px_0px_1px_rgb(163_138_138/0.2)] rounded-xl p-4 transition-all duration-300 will-change-auto transform-gpu">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor={`stations.${stationIndex}.label`}
                          className="font-bold text-base text-secondary"
                        >
                          Station {stationIndex + 1}
                        </label>
                        <div className="flex items-center gap-x-1">
                          <motion.button
                            {...whileTapOptions}
                            type="button"
                            onClick={() =>
                              push({
                                label: "",
                                options: [{ type: "text", value: "" }],
                              })
                            }
                            disabled={values.stations.length >= 10}
                            className={cn(
                              "flex items-center justify-center gap-x-1 text-sm font-medium text-secondary py-0.5 px-2 bg-gradient-to-b from-grayRed-50/0 hover:from-grayRed-50 to-secondary-100/0 hover:to-secondary-100 rounded-full transition-all duration-300 will-change-auto transform-gpu",
                              stationIndex !== values.stations.length - 1 &&
                                "opacity-0 hidden"
                            )}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              add
                            </span>
                            <span className="text-inherit hidden md:inline">
                              Add
                            </span>
                          </motion.button>

                          <motion.button
                            {...whileTapOptions}
                            type="button"
                            onClick={() => remove(stationIndex)}
                            disabled={values.stations.length <= 1}
                            className={cn(
                              "flex items-center justify-center gap-x-1 text-sm font-medium text-primary py-0.5 px-2 bg-gradient-to-b from-grayRed-50/0 hover:from-grayRed-50 to-primary-100/0 hover:to-primary-100 rounded-full opacity-100 transition-all duration-300 will-change-auto transform-gpu",
                              values.stations.length <= 1 && "opacity-0 hidden"
                            )}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              remove
                            </span>

                            <span className="text-inherit hidden md:inline">
                              Remove
                            </span>
                          </motion.button>
                        </div>
                      </div>
                      <small
                        aria-label={`stations.${stationIndex}.subLabel`}
                        className="text-grayRed-950/65 text-sm"
                      >
                        Each station represents a question in your Pandar Poll.
                      </small>

                      <div className="group/textarea w-full min-h-20 p-0.5 bg-gradient-to-br from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-xl mt-2">
                        <textarea
                          id={`stations.${stationIndex}.label`}
                          name={`stations.${stationIndex}.label`}
                          rows={2}
                          value={station.label}
                          onChange={handleChange}
                          className="w-full min-h-full p-2 rounded-xl group-hover/textarea:rounded-[10px] focus:rounded-[10px] resize-none shadow-inner text-grayRed-950/85 text-[15px] leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none"
                        />
                      </div>
                      <ErrorMessage
                        name={`stations.${stationIndex}.label`}
                        component="small"
                        className="text-red-500 text-sm mt-2"
                      />

                      <label
                        htmlFor={`option`}
                        className="font-bold text-base text-secondary mt-4"
                      >
                        Options
                      </label>
                      <small
                        aria-label={`option label`}
                        className="text-grayRed-950/65 text-sm mb-4"
                      >
                        Add a possible answer for this question. You can include
                        multiple options for participants to choose from.
                      </small>

                      <FieldArray name={`stations.${stationIndex}.options`}>
                        {({ push, remove, move }) => (
                          <>
                            {station.options.map(
                              (option: Option, optionIndex: number) => (
                                <div
                                  className={cn(
                                    "flex flex-col gap-y-1 w-full p-2 shadow-[0px_0px_0px_1px_rgb(163_138_138/0.30)] rounded-xl mb-2 transition-all duration-300 will-change-auto transform-gpu",
                                    optionIndex ===
                                      station.options.length - 1 && "mb-0"
                                  )}
                                >
                                  <div className="flex items-center gap-x-2 justify-between w-full">
                                    <div className="flex items-center gap-x-1 p-1 bg-white/20 backdrop-blur-lg backdrop-filter shadow rounded-full">
                                      <motion.button
                                        type="button"
                                        onClick={() =>
                                          setFieldValue(
                                            `stations.${stationIndex}.options.${optionIndex}.type`,
                                            "text"
                                          )
                                        }
                                        className={cn(
                                          "group/text text-grayRed-950/65 text-sm font-medium py-1 px-3 rounded-full bg-gradient-to-b from-grayRed-50/0 hover:from-primary-50 to-secondary-100/0 hover:to-secondary-50 transition-all duration-300 will-change-auto",
                                          option.type === "text" &&
                                            "from-primary-200/90 to-secondary-200/90"
                                        )}
                                      >
                                        <span
                                          className={cn(
                                            "text-transparent bg-gradient-to-b bg-clip-text group-hover/text:from-primary-600 from-primary-900/65 group-hover/text:to-secondary-600 to-secondary-900/65",
                                            option.type === "text" &&
                                              "from-primary-600 to-secondary-600"
                                          )}
                                        >
                                          Text
                                        </span>
                                      </motion.button>

                                      <motion.button
                                        type="button"
                                        onClick={() =>
                                          setFieldValue(
                                            `stations.${stationIndex}.options.${optionIndex}.type`,
                                            "image"
                                          )
                                        }
                                        className={cn(
                                          "group/text text-grayRed-950/65 text-sm font-medium py-1 px-3 rounded-full bg-gradient-to-b from-grayRed-50/0 hover:from-primary-50 to-secondary-100/0 hover:to-secondary-50 transition-all duration-300 will-change-auto",
                                          option.type === "image" &&
                                            "from-primary-200/90 to-secondary-200/90"
                                        )}
                                      >
                                        <span
                                          className={cn(
                                            "text-transparent bg-gradient-to-b bg-clip-text group-hover/text:from-primary-600 from-primary-900/65 group-hover/text:to-secondary-600 to-secondary-900/65",
                                            option.type === "image" &&
                                              "from-primary-600 to-secondary-600"
                                          )}
                                        >
                                          Image
                                        </span>
                                      </motion.button>
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                      <motion.button
                                        {...whileTapOptions}
                                        type="button"
                                        onClick={() =>
                                          push({
                                            type: "text",
                                            value: "",
                                          })
                                        }
                                        disabled={station.options.length >= 6}
                                        className={cn(
                                          "flex items-center justify-center gap-x-1 text-sm font-medium text-secondary py-0.5 px-2 bg-gradient-to-b from-grayRed-50/0 hover:from-grayRed-50 to-secondary-100/0 hover:to-secondary-100 rounded-full opacity-100 transition-all duration-300 will-change-auto transform-gpu",
                                          optionIndex !==
                                            station.options.length - 1 &&
                                            "opacity-0 hidden"
                                        )}
                                      >
                                        <span className="material-symbols-outlined text-[18px]">
                                          add
                                        </span>
                                        <span className="text-inherit hidden md:inline">
                                          Add
                                        </span>
                                      </motion.button>

                                      <motion.button
                                        {...whileTapOptions}
                                        type="button"
                                        onClick={() => remove(optionIndex)}
                                        disabled={station.options.length < 2}
                                        className={cn(
                                          "flex items-center justify-center gap-x-1 text-sm font-medium text-primary py-0.5 px-2 bg-gradient-to-b from-grayRed-50/0 hover:from-grayRed-50 to-primary-100/0 hover:to-primary-100 rounded-full opacity-100 transition-all duration-300 will-change-auto transform-gpu",
                                          station.options.length < 2 &&
                                            "opacity-0 hidden"
                                        )}
                                      >
                                        <span className="material-symbols-outlined text-[18px]">
                                          remove
                                        </span>
                                        <span className="text-inherit hidden md:inline">
                                          Remove
                                        </span>
                                      </motion.button>
                                    </div>
                                  </div>

                                  {option.type === "text" ? (
                                    <div className="group/input w-full min-h-10 p-0.5 bg-gradient-to-br from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-xl">
                                      <input
                                        id={`stations.${stationIndex}.options.${optionIndex}.value`}
                                        name={`stations.${stationIndex}.options.${optionIndex}.value`}
                                        value={option.value}
                                        onChange={handleChange}
                                        className="w-full min-h-full p-2 rounded-xl group-hover/input:rounded-[10px] focus:rounded-[10px] resize-none shadow-inner text-grayRed-950/85 text-[15px] leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none"
                                      />
                                    </div>
                                  ) : (
                                    <FileUpload
                                      name={`stations.${stationIndex}.options.${optionIndex}.value`}
                                    />
                                  )}

                                  <ErrorMessage
                                    name={`stations.${stationIndex}.options.${optionIndex}.value`}
                                    component="small"
                                    className="text-red-500 text-sm mt-2"
                                  />
                                </div>
                              )
                            )}
                          </>
                        )}
                      </FieldArray>
                    </div>
                  )
                )}
              </>
            )}
          </FieldArray>

          <DialogFooter className="flex flex-row gap-x-2 mt-4">
            <DialogClose asChild>
              <motion.button
                type="button"
                className="capitalize text-grayRed-900 py-3 px-6 rounded-full font-semibold text-[15px] bg-gradient-to-b from-grayRed-50/0 hover:from-grayRed-50 to-grayRed-500/0 hover:to-grayRed-500/70 transition-all duration-300 will-change-auto"
              >
                close
              </motion.button>
            </DialogClose>

            <motion.button
              type="submit"
              {...whileTapOptions}
              className="group/create-poll-btn grid grid-cols-1 place-items-center bg-gradient-to-br hover:bg-gradient-to-b from-primary to-secondary font-semibold text-[15px] p-0.5 rounded-full"
            >
              <motion.div className="bg-sitywatch-bg bg-cover bg-center group-hover/create-poll-btn:bg-none group-hover/create-poll-btn::bg-transparent flex items-center space-x-2 justify-center w-full h-full py-2.5 px-5 rounded-full transition-all duration-300 will-change-auto transform-gpu">
                <span
                  className={cn(
                    "material-symbols-outlined text-inherit text-[18px] md:text-[20px]",
                    startPollTextColors
                  )}
                >
                  bar_chart
                </span>
                <span className={cn("text-inherit", startPollTextColors)}>
                  Start Your Poll
                </span>
              </motion.div>
            </motion.button>
          </DialogFooter>
        </Form>
      )}
    </Formik>
  );
};

FileUpload.displayName = "FileUpload";
CreatePandarPollDialog.displayName = "CreatePandarPollDialog";
CreatePandarPollDialogFormik.displayName = "CreatePandarPollDialogFormik";
export { CreatePandarPollDialog };
