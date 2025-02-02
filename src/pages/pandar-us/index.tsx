import React, { useId, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import Image from "next/image";
import { imagePaths, whileTapOptions } from "@/constants";
import { CreatePandarPollDialog } from "@/pages/pandar-us/create-pandar-poll-dialog";
import { routes } from "@/constants/api.routes";
import { useLocationStore } from "@/store/location.store";
import { nanoid } from "@reduxjs/toolkit";

export type StationOptionProps = HTMLMotionProps<"button"> & {
  children?: React.ReactNode;
};

const MotionTab = motion(Tab);
const MotionTabPanel = motion(TabPanel);

const PandarUs = () => {
  const headers = new Headers();
  headers.append("X-CSCAPI-KEY", (process.env.NEXT_PUBLIC_CSC_API_KEY || ""));

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };


  return (
    <>
      <div className="min-h-screen w-full grid grid-cols-12 lg:gap-x-12">
        <div className="col-span-8 2xl:col-span-9 flex justify-center">
          <PandarUsTab />
        </div>

        <div className="col-span-4 2xl:col-span-3"></div>
      </div>
    </>
  );
};

const PandarUsTab = () => {
  const soulPandarEmptyState = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const soulContainer = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const pandarScentsContainer = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const pandarScentsContainer2 = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hasSoulPandars, setHasSoulPandars] = useState<boolean>(true);
  const [hasPandarScents, setPandarScents] = useState<boolean>(true);

  return (
    <TabGroup className={cn("flex flex-col gap-y-4 w-full 2xl:w-[60%] ")}>
      <TabList
        className={cn(
          "flex gap-x-2 items-center justify-between rounded-full bg-transparent p-2"
        )}
      >
        <MotionTab
          key="pandar-us"
          {...whileTapOptions}
          className={cn(
            "text-base xl:text-lg xl:tracking-wider font-bold text-muted data-[hover]:text-secondary-400 data-[selected]:text-secondary-400 active:text-secondary-600 transition-all duration-300 uppercase py-2 px-4 xl:py-2.5 xl:px-5 2xl:py-3 2xl:px-6 focus:outline-none !border-none !border-transparent !outline-transparent rounded-full will-change-auto bg-gradient-to-b from-secondary-100/0 data-[hover]:from-primary-100/75 data-[selected]:from-primary-100/75 to-primary-100/0 data-[hover]:to-secondary-100/75 data-[selected]:to-secondary-100/75 backdrop-filter backdrop-blur-md"
          )}
        >
          <span className="select-none">Pandar Polls</span>
        </MotionTab>

        <MotionTab
          key="soul-pandars"
          {...whileTapOptions}
          className={cn(
            "text-base md:text-lg xl:tracking-wider font-bold text-muted data-[hover]:text-secondary-400 data-[selected]:text-secondary-400 active:text-secondary-600 transition-all duration-300 uppercase py-2 px-4 xl:py-3 xl:px-6 focus:outline-none !border-none !border-transparent !outline-transparent rounded-full will-change-auto bg-gradient-to-b from-secondary-100/0 data-[hover]:from-primary-100/75 data-[selected]:from-primary-100/75 to-primary-100/0 data-[hover]:to-secondary-100/75 data-[selected]:to-secondary-100/75 backdrop-filter backdrop-blur-md"
          )}
        >
          <span className="select-none">Soul Pandars</span>
        </MotionTab>

        <MotionTab
          key="pandar-scents"
          {...whileTapOptions}
          className={cn(
            "text-base md:text-lg xl:tracking-wider font-bold text-muted data-[hover]:text-secondary-400 data-[selected]:text-secondary-400 active:text-secondary-600 transition-all duration-300 uppercase py-2 px-4 xl:py-3 xl:px-6 focus:outline-none !border-none !border-transparent !outline-transparent rounded-full will-change-auto bg-gradient-to-b from-secondary-100/0 data-[hover]:from-primary-100/75 data-[selected]:from-primary-100/75 to-primary-100/0 data-[hover]:to-secondary-100/75 data-[selected]:to-secondary-100/75 backdrop-filter backdrop-blur-md"
          )}
        >
          <span className="select-none">Pandar Scents</span>
        </MotionTab>
      </TabList>

      <TabPanels
        className={cn(
          "flex-1 min-h-[70vh] w-full relative rounded-t-[55px] shadow-inner shadow-muted-200/70 overflow-hidden"
        )}
      >
        <TabPanel
          key="pandar-us"
          className={cn(
            "p-5 lg:p-6 rounded-t-[60px] flex flex-col gap-y-4 xl:gap-y-6"
          )}
        >
          <div className="w-full flex items-center justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      scale: {
                        type: "tween",
                        duration: 0.03,
                        ease: "easeInOut",
                      },
                    }}
                    className="size-6 lg:size-8 group/info rounded-full p-0.5 grid place-items-center cursor-pointer text-grayRed-900 bg-gradient-to-b from-white/35 hover:from-secondary-100/75 to-grayRed-400/50 hover:to-primary-200/75 hover:shadow-sm transition-colors duration-300 backdrop-blur-md backdrop-filter border-none will-change-auto"
                  >
                    <i className="material-symbols-outlined group-hover/info:text-transparent group-hover/info:bg-gradient-to-r group-hover/info:bg-clip-text group-hover/info:from-primary group-hover/info:to-secondary transition-colors duration-300 will-change-auto">
                      info
                    </i>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>All polls are taken in anonymous pandar mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                {...whileTapOptions}
                className={cn(
                  "w-full group/poll-card min-h-20 grid grid-cols-1 p-0.5 hover:pb-2 hover:px-0.5 hover:pt-0.5 hover:shadow-sm rounded-2xl bg-gradient-to-br from-secondary via-secondary/50 to-primary transition-all duration-300 will-change-auto transform-gpu overflow-hidden"
                )}
              >
                <motion.div className="w-full h-full bg-sitywatch-bg p-6 rounded-[14px] group-hover/poll-card:rounded-b-2xl bg-center bg-cover relative overflow-hidden transition-all duration-300 will-change-auto">
                  <div className="flex flex-col items-center gap-y-2">
                    <div className="size-12 md:size-16 xl:size-20 grid place-items-center bg-gradient-to-b from-secondary-100/0 to-primary-100/0 shadow-inner shadow-grayRed/20 backdrop-filter backdrop-blur-md rounded-full group-hover/poll-card:scale-110 transition-all duration-300 will-change-transform transform-gpu">
                      <span className="material-symbols-outlined md:text-[35px] xl:text-[50px] text-transparent bg-gradient-to-r bg-clip-text from-primary to-secondary">
                        add_chart
                      </span>
                    </div>

                    <h6 className="font-bold text-lg text-tertiary text-center">
                      Create Pandar Poll
                    </h6>

                    <p className="text-sm text-tertiary text-center font-normal max-w-sm xl:max-w-lg">
                      Create your Pandar poll to ask the questions you can't ask
                      in person—completely anonymous, even to us!
                    </p>
                  </div>
                </motion.div>
              </motion.button>
            </DialogTrigger>

            <CreatePandarPollDialog />
          </Dialog>

          <PollPanel />
        </TabPanel>

        <TabPanel
          key="soul-pandars"
          className={cn("p-5 lg:p-6 rounded-t-[60px] flex flex-col gap-y-4")}
        >
          <motion.div
            ref={soulContainer.ref}
            initial={{ opacity: 0, filter: "blur(10px)", y: 100 }}
            animate={
              soulContainer.inView
                ? { y: 0, opacity: 1, filter: "blur(0px)" }
                : {}
            }
            transition={{ duration: 0.5, type: "tween", ease: "easeInOut" }}
            className={cn(
              "grid-cols-1 md:grid-cols-2 gap-4 w-full",
              hasSoulPandars ? "grid" : "hidden"
            )}
          >
            <SoulCard
              src={
                "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <SoulCard
              src={
                "https://images.unsplash.com/photo-1512310604669-443f26c35f52?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </motion.div>

          <motion.div
            ref={soulPandarEmptyState.ref}
            initial={{ opacity: 0, filter: "blur(10px)", y: 100 }}
            animate={
              soulPandarEmptyState.inView
                ? { y: 0, opacity: 1, filter: "blur(0px)" }
                : {}
            }
            transition={{ duration: 0.5, type: "tween", ease: "easeInOut" }}
            className={cn(
              "flex-col items-center gap-y-5 my-12",
              hasSoulPandars ? "hidden" : "flex"
            )}
          >
            <div className="size-14 relative overflow-hidden">
              <Image
                src={imagePaths.SHY_PANDAR}
                width={100}
                height={100}
                quality={100}
                priority
                alt={""}
                className="size-full object-contain"
              />
            </div>

            <p className="text-grayRed-950/65 text-sm text-center xl:max-w-[95%] 2xl:max-w-[80%]">
              No soul Pandar matches yet! 🐼✨ Create a Pandar Poll to discover
              your perfect matches and start connecting.
            </p>
          </motion.div>
        </TabPanel>

        <TabPanel
          key="pandar-scents"
          className={"p-5 lg:p-6 rounded-t-[60px] flex flex-col gap-y-4"}
        >
          <div className="w-full flex items-center justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      scale: {
                        type: "tween",
                        duration: 0.03,
                        ease: "easeInOut",
                      },
                    }}
                    className="size-6 lg:size-8 group/info rounded-full p-0.5 grid place-items-center cursor-pointer text-grayRed-900 bg-gradient-to-b from-white/35 hover:from-secondary-100/75 to-grayRed-400/50 hover:to-primary-200/75 hover:shadow-sm transition-colors duration-300 backdrop-blur-md backdrop-filter border-none will-change-auto"
                  >
                    <i className="material-symbols-outlined group-hover/info:text-transparent group-hover/info:bg-gradient-to-r group-hover/info:bg-clip-text group-hover/info:from-primary group-hover/info:to-secondary transition-colors duration-300 will-change-auto">
                      info
                    </i>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    You&apos;ll only know if your Soul Pandar left a scent after
                    you share one first!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <TabGroup className={cn("flex flex-col gap-y-4 w-full")}>
            <TabList
              className={cn(
                "place-items-center flex gap-x-2 items-center justify-center rounded-full bg-transparent p-2"
              )}
            >
              <MotionTab
                key="scents-received"
                {...whileTapOptions}
                className={cn(
                  "text-base xl:tracking-wider font-bold text-muted data-[hover]:text-secondary-400 data-[selected]:text-secondary-400 active:text-secondary-600 transition-all duration-300 uppercase py-2 px-4 xl:py-2.5 xl:px-5 focus:outline-none !border-none !border-transparent !outline-transparent rounded-full will-change-auto bg-gradient-to-b from-secondary-100/0 data-[hover]:from-primary-100/75 data-[selected]:from-primary-100/75 to-primary-100/0 data-[hover]:to-secondary-100/75 data-[selected]:to-secondary-100/75 backdrop-filter backdrop-blur-md"
                )}
              >
                <span className="select-none">Scents You&apos;ve Got</span>
              </MotionTab>

              <MotionTab
                key="scents-given"
                {...whileTapOptions}
                className={cn(
                  "text-base xl:tracking-wider font-bold text-muted data-[hover]:text-secondary-400 data-[selected]:text-secondary-400 active:text-secondary-600 transition-all duration-300 uppercase py-2 px-4 xl:py-2.5 xl:px-5 focus:outline-none !border-none !border-transparent !outline-transparent rounded-full will-change-auto bg-gradient-to-b from-secondary-100/0 data-[hover]:from-primary-100/75 data-[selected]:from-primary-100/75 to-primary-100/0 data-[hover]:to-secondary-100/75 data-[selected]:to-secondary-100/75 backdrop-filter backdrop-blur-md"
                )}
              >
                <span className="select-none">Scents You&apos;ve Sent</span>
              </MotionTab>
            </TabList>

            <TabPanels className="w-full">
              <MotionTabPanel
                key="scents-received"
                ref={pandarScentsContainer.ref}
                initial={{ opacity: 0, filter: "blur(10px)", y: 100 }}
                animate={
                  pandarScentsContainer.inView
                    ? { y: 0, opacity: 1, filter: "blur(0px)" }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  type: "tween",
                  ease: "easeInOut",
                }}
                className="w-full"
              >
                <motion.div
                  className={cn(
                    "flex-col items-center gap-y-2",
                    hasPandarScents ? "flex" : "hidden"
                  )}
                >
                  <ScentPanel />
                  <div className="w-full h-px bg-grayRed/30" />
                  <ScentPanel />
                  <div className="w-full h-px bg-grayRed/30" />
                  <ScentPanel />
                </motion.div>

                <motion.div
                  className={cn(
                    "flex-col items-center gap-y-5 my-12",
                    hasPandarScents ? "hidden" : "flex"
                  )}
                >
                  <div className="size-14 relative overflow-hidden">
                    <Image
                      src={imagePaths.SHY_PANDAR}
                      width={100}
                      height={100}
                      quality={100}
                      priority
                      alt={""}
                      className="size-full object-contain"
                    />
                  </div>

                  <p className="text-grayRed-950/65 text-sm text-center xl:max-w-[95%] 2xl:max-w-[80%]">
                    No Pandar Scents yet! 🌸 Leave a scent on your Soul Pandar
                    matches, and they might just send one back your way. Let the
                    connection bloom!
                  </p>
                </motion.div>
              </MotionTabPanel>

              <MotionTabPanel
                key="scents-given"
                ref={pandarScentsContainer2.ref}
                initial={{ opacity: 0, filter: "blur(10px)", y: 100 }}
                animate={
                  pandarScentsContainer2.inView
                    ? { y: 0, opacity: 1, filter: "blur(0px)" }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  type: "tween",
                  ease: "easeInOut",
                }}
                className="w-full"
              >
                <motion.div
                  className={cn(
                    "flex-col items-center gap-y-2",
                    hasPandarScents ? "flex" : "hidden"
                  )}
                >
                  <ScentPanel reversed />
                  <div className="w-full h-px bg-grayRed/30" />
                  <ScentPanel reversed />
                  <div className="w-full h-px bg-grayRed/30" />
                  <ScentPanel reversed />
                </motion.div>

                <motion.div
                  className={cn(
                    "flex-col items-center gap-y-5 my-12",
                    hasPandarScents ? "hidden" : "flex"
                  )}
                >
                  <div className="size-14 relative overflow-hidden">
                    <Image
                      src={imagePaths.SHY_PANDAR}
                      width={100}
                      height={100}
                      quality={100}
                      priority
                      alt={""}
                      className="size-full object-contain"
                    />
                  </div>

                  <p className="text-grayRed-950/65 text-sm text-center xl:max-w-[95%] 2xl:max-w-[80%]">
                    No Pandar Scents yet! 🌸 Leave a scent on your Soul Pandar
                    matches, and they might just send one back your way. Let the
                    connection bloom!
                  </p>
                </motion.div>
              </MotionTabPanel>
            </TabPanels>
          </TabGroup>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

const PollPanel = () => {
  const [thought, setThought] = useState("");
  const [showThough, setShowThought] = useState(false);

  return (
    <motion.div className="w-full flex flex-col gap-y-2 min-h-[400px] p-5 xl:p-6 rounded-2xl bg-white/30 backdrop-blur-md backdrop-filter">
      <div className="w-full flex gap-2 mb-2 border-none">
        <div className="flex-1 flex items-start gap-x-2">
          <div className="size-12 p-0.5 relative grid place-items-center overflow-hidden">
            <Image
              src={imagePaths.PANDAR}
              alt={""}
              width={100}
              height={100}
              quality={100}
              priority
              draggable={false}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col gap-y-0.5">
            <h6 className="text-base font-bold text-grayRed-950">
              @Pandar PLF
            </h6>

            <div className="flex items-center space-x-1 text-grayRed-950/65 text-xs">
              <span className="text-inherit">2h</span>
              <span className="text-inherit">•</span>
              <span className="material-symbols-outlined text-inherit text-[14.5px]">
                globe
              </span>
              <span className="text-inherit">Public</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                {...whileTapOptions}
                className="size-8 text-sm p-0.5 rounded-full grid place-items-center cursor-pointer text-grayRed-900 bg-gradient-to-b from-white/35 hover:from-secondary-100/75 to-grayRed-400/50 hover:to-primary-200/75 hover:shadow-sm transition-colors duration-300 backdrop-blur-md backdrop-filter border-none will-change-auto"
              >
                <span className="material-symbols-outlined text-inherit">
                  more_horiz
                </span>
              </motion.button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-sitywatch-bg bg-cover bg-center border-[rgb(163_138_138/0.3)]">
              <DropdownMenuItem>
                <span className="inline-block material-symbols-outlined text-[20px]">
                  frame_source
                </span>
                <span className="inline">Embed Poll</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-grayRed/35" />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span className="inline-block material-symbols-outlined text-[20px]">
                    eye_tracking
                  </span>
                  <span className="inline">Watch </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-grayRed/35" />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span className="inline-block material-symbols-outlined text-[20px]">
                    flag
                  </span>
                  <span className="inline">Report Poll</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary-600">
                  <span className="inline-block material-symbols-outlined text-[20px]">
                    delete
                  </span>
                  <span className="inline">Trash Poll</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <StationPanel />
      <StationPanel />

      <div className="flex justify-center">
        <motion.button
          {...whileTapOptions}
          className="group/undo flex text-sm font-semibold py-1.5 px-3 rounded-full place-items-center gap-x-1 cursor-pointer text-grayRed-900 bg-gradient-to-b from-white/35 hover:from-primary-100/75 to-grayRed-400/50 hover:to-secondary-200/75 hover:shadow-sm transition-colors duration-300 backdrop-blur-md backdrop-filter border-none opacity-100 will-change-auto"
        >
          <span className="material-symbols-outlined text-inherit text-[16px] md:text-[18px] group-hover/undo:text-transparent group-hover/undo:bg-gradient-to-b group-hover/undo:bg-clip-text group-hover/undo:from-primary-600 group-hover/undo:to-secondary-600 transition-colors duration-300 will-change-auto">
            undo
          </span>

          <span className="capitalize group-hover/undo:text-transparent group-hover/undo:bg-gradient-to-b group-hover/undo:bg-clip-text group-hover/undo:from-primary-600 group-hover/undo:to-secondary-600 transition-colors duration-300 will-change-auto">
            Undo
          </span>
        </motion.button>
      </div>

      <div className="w-full flex items-center justify-between border-b border-t border-grayRed/20 py-1 my-2">
        <div className="flex items-center space-x-1 text-grayRed-950/65 text-xs md:text-sm">
          <span className="inline-block size-4 md:size-5 relative">
            <Image
              src={imagePaths.PANDAR}
              alt={""}
              width={20}
              height={20}
              quality={100}
              priority
              draggable={false}
              className="object-contain"
            />
          </span>
          <span className="text-inherit">
            8 <span className="hidden md:inline"></span>pandars
          </span>
          <span className="text-inherit">•</span>
          <span className="text-inherit">22h remaining</span>
        </div>

        <div className="flex items-center space-x-1 text-grayRed-950/65 text-xs md:text-sm">
          <button
            onClick={() => setShowThought(!showThough)}
            aria-label={`thoughts`}
            className="text-inherit hover:text-transparent hover:bg-gradient-to-b hover:bg-clip-text hover:from-primary hover:to-secondary transition-colors duration-300 will-change-auto"
          >
            6 thoughts
          </button>
          <span className="text-inherit">•</span>
          <Link
            href={""}
            aria-label={`recites`}
            className="text-inherit hover:text-transparent hover:bg-gradient-to-b hover:bg-clip-text hover:from-primary hover:to-secondary transition-colors duration-300 will-change-auto"
          >
            2 recites
          </Link>
        </div>
      </div>

      <div className="flex gap-x-1 items-center">
        <PollActionButton text={"Hype"} icon={"icon-hype"} />
        <PollActionButton text={"Thought"} icon={"cognition_2"} />
        <PollActionButton text={"Recite"} icon={"repeat"} />
        <PollActionButton text={"Send"} icon={"send"} />
      </div>

      <form className={cn("w-full transition-all duration-300 will-change-auto", showThough ? "block opacity-100" : "hidden opacity-0")}>
        <div className={cn("group/textarea min-h-12 p-0.5 grid grid-cols-1 w-full bg-gradient-to-br from-primary to-secondary", thought.length > 0 ? "rounded-2xl" : "rounded-full")}>
          <div className={cn("w-full h-full flex flex-col justify-center bg-white/90 p-2 rounded-2xl", thought.length > 0 ? "rounded-[14px]" : "rounded-full")}>
            <textarea
              name="thought"
              rows={1}
              placeholder="Share your thought..."
              onChange={(e) => setThought(e.target.value)}
              className="border-none w-full rounded max-h-36 px-0.5 resize-none outline-none outline-transparent focus:outline-none text-sm text-grayRed-950 bg-white/5 m-0 placeholder:text-grayRed-950/40 placeholder:opacity-95"
            />

            <div className={cn("self-end justify-end w-full rounded-full transition-all duration-300 will-change-auto mt-1", thought.length > 0 ? "flex opacity-100" : "hidden opacity-0")}>
              <motion.button
                {...whileTapOptions}
                type="submit"
                className="group/textarea-action p-0.5 grid grid-cols-1 text-sm rounded-full bg-gradient-to-br hover:bg-gradient-to-b from-primary to-secondary transition-all duration-300 will-change-auto"
              >
                <div className="size-full grid place-items-center bg-sitywatch-bg bg-center bg-no-repeat group-hover/textarea-action:bg-none rounded-full py-1 px-2 transition-all duration-300">
                  <span className="text-transparent bg-gradient-to-b bg-clip-text from-primary-600 group-hover/textarea-action:from-primary-50 to-secondary-600 group-hover/textarea-action:to-secondary-50 font-medium transition-all duration-300">
                    Thought
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

const StationPanel = () => {
  return (
    <motion.div className="flex-1 flex flex-col gap-y-4 w-full border-none rounded-2xl p-4 bg-transaprent shadow-[0px_0px_0px_1px_rgb(166_138_138/0.2)] backdrop-blur-md backdrop-filter">
      <p className="font-bold text-grayRed-950 text-base">
        Someone has been criticizing my album for the past 3 hours. How should I
        respond?
      </p>

      <div className="flex flex-col gap-y-2">
        <StationOption>Ignore them</StationOption>
        <StationOption>Respond politely</StationOption>
        <StationOption>Defend your work</StationOption>
        <StationOption>Ask for constructive feedback</StationOption>
      </div>
    </motion.div>
  );
};

const StationOption: React.FC<StationOptionProps> = ({ children, ...rest }) => {
  return (
    <motion.button
      {...rest}
      className="group/station-panel w-full p-px hover:p-0.5 rounded-full grid grid-cols-1 bg-gradient-to-r from-primary to-secondary text-transparent text-base font-medium transition-all duration-300 will-change-auto"
    >
      <div className="w-full h-full py-1 px-2 bg-white rounded-full flex justify-center items-center relative overflow-hidden">
        <span className="relative z-20 bg-gradient-to-b bg-clip-text from-primary-600 to-secondary-600">
          {children}
        </span>
        <div className="absolute bg-gradient-to-br from-grayRed-50 via-primary-100/20 to-grayRed-50 group-hover/station-panel:from-primary-100/70 group-hover/station-panel:to-secondary-100/70 backdrop-filter backdrop-blur-md h-full w-full z-10 transition-all duration-300 will-change-auto"></div>
      </div>
    </motion.button>
  );
};

const pollActionBtnHoverClassNames =
  "group-hover/poll-action:bg-gradient-to-b group-hover/poll-action:bg-clip-text group-hover/poll-action:from-primary-600 group-hover/poll-action:to-secondary-600";

const PollActionButton: React.FC<
  StationOptionProps & { text?: string; icon?: string }
> = ({ text, icon, children }) => {
  return (
    <motion.button
      {...whileTapOptions}
      className="group/poll-action w-full flex items-center justify-center py-2.5 px-5 rounded-full gap-x-1 font-semibold text-grayRed-950 hover:text-transparent text-xs md:text-sm bg-gradient-to-b from-primary-100/0 to-secondary-100/0 hover:from-primary-100/75 hover:to-secondary-100/75 !border-none focus:outline-none outline-transparent border-transparent transition-all duration-300 will-change-auto"
    >
      <span
        className={cn(
          text?.toLowerCase() !== "hype" && "material-symbols-outlined",
          "text-inherit text-[16px] md:text-[18px] opacity-100 transition-transform duration-300 rotate-0 will-change-transform transform-gpu",
          pollActionBtnHoverClassNames,
          icon === "send" && "group-hover/poll-action:-rotate-45",
          !icon && "hidden opacity-0",
          icon
        )}
      >
        {text?.toLowerCase() !== "hype" && icon}
      </span>
      <span
        className={cn(
          "text-inherit hidden md:inline opacity-100 transition-all duration-300 capitalize",
          pollActionBtnHoverClassNames,
          !text && "hidden opacity-0"
        )}
      >
        {text}
      </span>
      {children}
    </motion.button>
  );
};

const ScentPanel: React.FC<{ reversed?: boolean }> = ({ reversed }) => {
  return (
    <>
      <motion.div className="flex items-center justify-between gap-x-2 py-2 w-full transition-all duration-300 will-change-auto">
        <div className="flex items-center gap-x-2">
          <div className="size-[52px] md:size-[60px] flex justify-center items-center rounded-full bg-gradient-to-br from-primary-300 to-secondary-300 shadow-[0px_0px_0px_1px_rgb(163_138_138/0.2)]">
            <div className="size-12 md:size-14 relative rounded-full overflow-hidden grid grid-cols-1">
              <Image
                src={
                  "https://plus.unsplash.com/premium_photo-1661868397660-8c52f33c5934?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={""}
                priority
                width={1000}
                height={1000}
                quality={100}
                draggable={false}
                className="size-full object-contain object-top rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-0.5">
            <p className="text-sm md:text-base text-grayRed-950">
              {reversed && "You left a scent for"}
              {reversed && " "}
              <span className="text-secondary font-semibold">@bingebinta</span>
              {!reversed && " "}
              {!reversed && "left a scent!"}
            </p>
            <div className="flex items-center">
              <small className="text-xs text-grayRed-950/65">Yesterday</small>
            </div>
          </div>
        </div>

        <div className={cn("justify-self-end flex items-center gap-x-2")}>
          <motion.button
            {...whileTapOptions}
            type="button"
            className={cn(reversed ? "hidden" : "flex", "items-center space-x-1 text-sm text-transparent font-medium rounded-full py-2 px-4 bg-gradient-to-b from-primary-100/50 hover:from-primary-100 to-secondary-100/50 hover:to-secondary-100 hover:shadow-inner border-none focus:outline-none outline-transparent transition-all duration-300 will-change-auto")}
          >
            <span className="icon-scent text-[20px] bg-gradient-to-b bg-clip-text from-primary to-secondary"></span>
            <span className="bg-gradient-to-b bg-clip-text from-primary to-secondary">
              Send a Scent Back
            </span>
          </motion.button>

          <div className="flex items-start gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                {...whileTapOptions}
                className="size-8 text-sm p-0.5 rounded-full grid place-items-center cursor-pointer text-grayRed-900 bg-gradient-to-b from-white/35 hover:from-secondary-100/75 to-grayRed-400/50 hover:to-primary-200/75 hover:shadow-sm transition-colors duration-300 backdrop-blur-md backdrop-filter border-none will-change-auto"
              >
                <span className="material-symbols-outlined text-inherit">
                  more_vert
                </span>
              </motion.button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-sitywatch-bg bg-cover bg-center border-[rgb(163_138_138/0.3)]">
              <DropdownMenuItem>
                <span className="inline-block icon-eye-shadows text-[20px]"> </span>
                <span className="inline">Look at</span>
                <span className="text-secondary">@bingebinta</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-grayRed/35" />

              <DropdownMenuItem>
                <span className="inline-block material-symbols-outlined text-[20px]">
                  eye_tracking
                </span>
                <span className="inline">Watch </span>
                <span className="text-secondary">@bingebinta</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-grayRed/35" />

              <DropdownMenuItem>
                  <span className="inline-block material-symbols-outlined text-[20px]">
                    hearing
                  </span>
                  <span className="inline">Whisper to</span>
                  <span className="text-secondary">@bingebinta</span>
                </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-grayRed/35" />

              <DropdownMenuItem>
                  <span className="inline-block material-symbols-outlined text-[20px]">
                    format_quote
                  </span>
                  <span className="inline">Cite</span>
                  <span className="text-secondary">@bingebinta</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>
      </motion.div>
    </>
  );
};

const SoulCard: React.FC<{ src: string }> = (props) => {
  const { src } = props;

  return (
    <>
      <motion.div className="w-full min-h-72 relative overflow-hidden rounded-3xl shadow-[0px_0px_0px_1px_rgb(163_138_138/0.20)] transition-all duration-300 will-change-auto">
        <Image
          priority
          src={src}
          alt={""}
          width={1000}
          height={1000}
          quality={100}
          draggable={false}
          className={"size-full z-10"}
        />

        <div className="absolute inline-block top-0 m-2 bg-gradient-to-r from-grayRed-50/25 via-grayRed-50/75 to-grayRed-50/25 backdrop-blur-sm font-semibold italic backdrop-filter max-w-[60%] text-sm text-grayRed-950 rounded-full py-2 px-4">
          @binge.binta 💗
        </div>

        <div className="absolute flex flex-col gap-y-2 items-start p-2 w-full rounded-b-2xl bottom-0 bg-gradient-to-r from-grayRed-950/0 text-grayRed-100 via-grayRed-950/50 to-grayRed-950/0 backdrop-blur-none backdrop-filter z-20">
          <div className="flex flex-col w-full gap-y-0.5 p-2 border-none outline-none shadow-none">
            <h6 className="text-base font-medium">Binta Nwagwan</h6>

            <div className="flex items-center space-x-1">
              <small className="text-xs md:text-sm font-light">
                University of Port Harcourt
              </small>
              <span className="text-inherit">•</span>
              <small className="text-xs md:text-sm font-light">Alumna</small>
            </div>
          </div>

          <div className="flex justify-center w-full space-x-2">
            <motion.button
              type="button"
              className="group/soul-action flex items-center justify-center py-2 h-11 hover:gap-x-1 text-sm font-medium rounded-full bg-gradient-to-b from-primary-100 to-secondary-100 hover:to-secondary-200 backdrop-blur-lg backdrop-filter w-16 hover:!w-40 overflow-hidden transition-all duration-300 will-change-auto transform-gpu"
            >
              <span className="icon-scent text-[20px] md:text-[22px] xl:text-[32px] grid place-self-center text-transparent bg-gradient-to-b bg-clip-text from-primary to-secondary"></span>
              <span
                className={cn(
                  "inline-block whitespace-nowrap h-0 w-0 opacity-0 group-hover/soul-action:h-auto group-hover/soul-action:w-auto group-hover/soul-action:opacity-100 text-transparent bg-gradient-to-b bg-clip-text from-primary-600/95 to-secondary-600/95 transition-all duration-300 delay-100 will-change-auto transform-gpu"
                )}
              >
                Leave a scent
              </span>
            </motion.button>

            <motion.button
              type="button"
              className="group/soul-action flex items-center justify-center py-2 h-11 hover:gap-x-1.5 text-sm font-medium rounded-full bg-gradient-to-b from-primary-100 to-secondary-100 hover:to-secondary-200 backdrop-blur-lg backdrop-filter w-16 hover:!w-48 overflow-hidden transition-all duration-300 will-change-auto transform-gpu"
            >
              <span className="icon-eye-shadows text-[20px] md:text-[22px] xl:text-[25px] grid place-self-center text-transparent bg-gradient-to-b bg-clip-text from-primary to-secondary"></span>
              <span
                className={cn(
                  "inline-block whitespace-nowrap h-0 w-0 opacity-0 group-hover/soul-action:h-auto group-hover/soul-action:w-auto group-hover/soul-action:opacity-100 text-transparent bg-gradient-to-b bg-clip-text from-primary-600/95 to-secondary-600/95 transition-all duration-300 delay-100 will-change-auto transform-gpu"
                )}
              >
                Take a Closer Look
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

ScentPanel.displayName = "ScentPanel";
SoulCard.displayName = "SoulCard";
PandarUs.displayName = "PandaUs";
PollPanel.displayName = "PollPanel";
PandarUsTab.displayName = "PandaUsTab";
StationPanel.displayName = "StationPanel";
StationOption.displayName = "StationOption";
export default PandarUs;
