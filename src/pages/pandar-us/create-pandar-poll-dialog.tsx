import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { imagePaths, whileTapOptions } from "@/constants";
import { motion } from "framer-motion";
import { cn } from "@/lib";
import { Dialog } from "@radix-ui/react-dialog";

const startPollTextColors =
  "text-transparent bg-gradient-to-b bg-clip-text from-primary-600 to-secondary-600 group-hover/create-poll-btn:from-primary-50 group-hover/create-poll-btn:to-secondary-50 transition-all duration-300 will-change-auto";

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

        <form className="grid gap-4 py-4">
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
                rows={3}
                className="w-full min-h-full p-2 rounded-xl group-hover/textarea:rounded-[10px] focus:rounded-[10px] resize-none shadow-inner text-grayRed-950/85 text-[15px] leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none"
              />
            </div>
          </div>

          <div className="w-full border-b border-grayRed/35 mt-1"></div>

          {/* Station */}
          <div className="flex flex-col gap-y-1 w-full mt-1 shadow-[0px_0px_0px_1px_rgb(163_138_138/0.2)] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor={`station-label-1`}
                className="font-bold text-base text-secondary"
              >
                Station 1
              </label>

              <div className="flex items-center gap-x-1">
                <motion.button
                  {...whileTapOptions}
                  type="button"
                  className="flex items-center justify-center gap-x-1 text-sm font-medium text-secondary py-0.5 px-2 bg-gradient-to-b from-grayRed-50/0 hover:from-grayRed-50 to-secondary-100/0 hover:to-secondary-100 rounded-full transition-all duration-300 will-change-auto transform-gpu"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    add
                  </span>
                  <span className="text-inherit hidden md:inline">Add</span>
                </motion.button>

                <motion.button
                  {...whileTapOptions}
                  type="button"
                  className="flex items-center justify-center gap-x-1 text-sm font-medium text-primary py-0.5 px-2 bg-gradient-to-b from-grayRed-50/0 hover:from-grayRed-50 to-primary-100/0 hover:to-primary-100 rounded-full transition-all duration-300 will-change-auto transform-gpu"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    remove
                  </span>
                  <span className="text-inherit hidden md:inline">Remove</span>
                </motion.button>
              </div>
            </div>

            <small
              aria-label={`station-sub-label-1`}
              className="text-grayRed-950/65 text-sm"
            >
              Each station represents a question in your Pandar Poll.
            </small>

            <div className="group/textarea w-full min-h-20 p-0.5 bg-gradient-to-br from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-xl mt-2">
              <textarea
                id={`station-label-1`}
                rows={2}
                className="w-full min-h-full p-2 rounded-xl group-hover/textarea:rounded-[10px] focus:rounded-[10px] resize-none shadow-inner text-grayRed-950/85 text-[15px] leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-y-1 mt-3 w-full">
              <label
                htmlFor={`station-label-1`}
                className="font-bold text-base text-secondary"
              >
                Option
              </label>

              <small
                aria-label={`station-sub-label-1`}
                className="text-grayRed-950/65 text-sm mb-2"
              >
                Add a possible answer for this question. You can include
                multiple options for participants to choose from.
              </small>

              <div className="flex flex-col gap-y-1.5 mt-1 w-full p-2 rounded-2xl shadow-[0px_0px_0px_1px_rgb(163_138_138/0.2)]">
                <div className="flex items-center gap-x-2 justify-between w-full">
                  <div className="flex items-center gap-x-1 p-1 bg-white/20 backdrop-blur-lg backdrop-filter shadow-[0px_0px_0px_1px_rgb(163_138_138/0.4)] rounded-full">
                    <motion.button
                      type="button"
                      className={cn(
                        "group/text text-grayRed-950/65 text-sm font-medium py-1 px-3 rounded-full bg-gradient-to-b from-grayRed-50/0 hover:from-primary-50 to-secondary-100/0 hover:to-secondary-50 transition-all duration-300 will-change-auto",
                        true && "from-primary-200/90 to-secondary-200/90"
                      )}
                    >
                      <span
                        className={cn(
                          "text-transparent bg-gradient-to-b bg-clip-text group-hover/text:from-primary-600 from-primary-900/65 group-hover/text:to-secondary-600 to-secondary-900/65",
                          true && "from-primary-600 to-secondary-600"
                        )}
                      >
                        Text
                      </span>
                    </motion.button>

                    <motion.button
                      type="button"
                      className={cn(
                        "group/text text-grayRed-950/65 text-sm font-medium py-1 px-3 rounded-full bg-gradient-to-b from-grayRed-50/0 hover:from-primary-50 to-secondary-100/0 hover:to-secondary-50 transition-all duration-300 will-change-auto",
                        false && "from-primary-200/90 to-secondary-200/90"
                      )}
                    >
                      <span
                        className={cn(
                          "text-transparent bg-gradient-to-b bg-clip-text group-hover/text:from-primary-600 from-primary-900/65 group-hover/text:to-secondary-600 to-secondary-900/65",
                          false && "from-primary-600 to-secondary-600"
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
                      className="flex items-center justify-center gap-x-1 text-sm font-medium text-secondary py-0.5 px-2 bg-gradient-to-b from-grayRed-50/0 hover:from-grayRed-50 to-secondary-100/0 hover:to-secondary-100 rounded-full transition-all duration-300 will-change-auto transform-gpu"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        add
                      </span>
                      <span className="text-inherit hidden md:inline">Add</span>
                    </motion.button>

                    <motion.button
                      {...whileTapOptions}
                      type="button"
                      className="flex items-center justify-center gap-x-1 text-sm font-medium text-primary py-0.5 px-2 bg-gradient-to-b from-grayRed-50/0 hover:from-grayRed-50 to-primary-100/0 hover:to-primary-100 rounded-full transition-all duration-300 will-change-auto transform-gpu"
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

                <div className="group/textarea w-full min-h-10 p-0.5 bg-gradient-to-br from-primary/0 to:secondary/0 hover:from-primary focus-within:from-primary hover:to-secondary focus-within:to-secondary rounded-xl">
                  <input
                    id={`station-label-1`}
                    className="w-full min-h-full p-2 rounded-xl group-hover/textarea:rounded-[10px] focus:rounded-[10px] resize-none shadow-inner text-grayRed-950/85 text-[15px] leading-[23px] bg-white/90 focus:bg-white/95 backdrop-blur backdrop-filter focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

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
        </form>
      </DialogContent>
    </>
  );
};

CreatePandarPollDialog.displayName = "CreatePandarPollDialog";
export { CreatePandarPollDialog };
