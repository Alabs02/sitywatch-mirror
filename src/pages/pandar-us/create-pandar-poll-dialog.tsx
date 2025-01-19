import React, { useRef } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { imagePaths, whileTapOptions } from "@/constants";
import { motion } from "framer-motion";
import { cn } from "@/lib";

import { useDropzone } from "react-dropzone";
import { Formik, Form, FieldArray, ErrorMessage, useField } from "formik";

import * as Yup from "yup";

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
});

interface Option {
  type: string;
  value: any;
}

interface Station {
  label: string;
  options: Option[];
}

interface FormValues {
  pollDescription: string;
  stations: Station[];
}

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

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setValue(acceptedFiles[0]);
    }
  };

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
          isDragActive ? "bg-gradient-to-br from-primary-200/80 to-secondary-200/80": "bg-white/85"
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

const CreatePandarPollDialogFormik: React.FC = () => {
  return (
    <Formik<FormValues>
      initialValues={{
        pollDescription: "",
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
                        className="text-red-500 mt-2"
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
                                          station.options.length < 2 && "opacity-0 hidden"
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
                                    <div className="group/textarea w-full min-h-10 p-0.5 bg-gradient-to-br from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-xl">
                                      <input
                                        id={`stations.${stationIndex}.options.${optionIndex}.value`}
                                        name={`stations.${stationIndex}.options.${optionIndex}.value`}
                                        value={option.value}
                                        onChange={handleChange}
                                        className="w-full min-h-full p-2 rounded-xl group-hover/textarea:rounded-[10px] focus:rounded-[10px] resize-none shadow-inner text-grayRed-950/85 text-[15px] leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none"
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
                                    className="text-red-500 mt-2"
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
