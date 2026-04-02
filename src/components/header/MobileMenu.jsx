"use client";

import { ChevronRight, Menu, ChevronDown } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/routes";
import { BASE_URL } from "@/utils/constants";
import ButtonCustom from "../buttons/ButtonCustom";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonLight from "../buttons/ButtonLight";

function MobileMenu() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="lg:hidden flex">
      <ButtonCustom
        onPress={onOpen}
        className="p-2 sm:px-3 px-2 h-auto min-w-max bg-white/40 dark:bg-slate-800/40 backdrop-blur-md"
        startContent={<Menu />}
      />
      <Drawer
        className="bg-slate-50 dark:bg-slate-900 py-5"
        size="xs"
        placement="left"
        backdrop="blur"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              duration: 0.3,
            },
            exit: {
              x: -100,
              opacity: 0,
              duration: 0.3,
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 w-full">
                <Link
                  href={BASE_URL}
                  className="font-allura flex items-center gap-2 md:text-2xl text-xl font-normal"
                >
                  <Image
                    width={35}
                    height={35}
                    src={"./logo.svg"}
                    alt="Dyt. Gizem Akbulut"
                  />
                  Dyt. Gizem Akbulut
                </Link>
              </DrawerHeader>
              <DrawerBody>
                <div className="flex items-start flex-col gap-2">
                  {routes.map((route, index) => {
                    // Dropdown tipi
                    if (route.type === "dropdown") {
                      return (
                        <Accordion
                          key={index}
                          className="w-full px-0"
                          itemClasses={{
                            base: "px-0",
                            trigger:
                              "px-0 py-2 data-[hover=true]:bg-transparent",
                            title: "text-base text-black dark:text-white",
                            indicator: "text-violet-500 dark:text-violet-400",
                            content: "px-0 pt-0 pb-2",
                          }}
                        >
                          <AccordionItem
                            key={index}
                            aria-label={route.text}
                            title={
                              <div className="flex items-center gap-2">
                                {route.icon && (
                                  <route.icon
                                    width={14}
                                    className="text-violet-500 dark:text-violet-400"
                                  />
                                )}
                                <span>{route.text}</span>
                              </div>
                            }
                            indicator={<ChevronDown width={16} />}
                          >
                            <div className="flex flex-col gap-1 ml-6">
                              {route.submenu.map((item, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={item.href}
                                  onClick={onClose}
                                  className="flex flex-col gap-1 py-2 px-3 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
                                >
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400">
                                    {item.text}
                                  </span>
                                  {item.description && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {item.description}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </AccordionItem>
                        </Accordion>
                      );
                    }

                    // Normal link
                    return (
                      <Link
                        key={index}
                        href={route.href}
                        onClick={onClose}
                        className="flex items-center gap-2 py-2 w-full text-base text-black hover:text-violet-500 dark:text-white dark:hover:text-violet-400 transition-colors duration-100"
                      >
                        {route.icon && (
                          <route.icon
                            width={14}
                            className="text-violet-500 dark:text-violet-400"
                          />
                        )}
                        {route.text}
                      </Link>
                    );
                  })}

                  <div className="flex flex-col gap-4 w-full mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <ButtonPrimary
                      className="w-full"
                      endContent={<ChevronRight width={14} />}
                    >
                      Ücretsiz Kayıt Ol
                    </ButtonPrimary>
                    <ButtonLight
                      className="w-full"
                      endContent={<ChevronRight width={14} />}
                    >
                      Giriş Yap
                    </ButtonLight>
                  </div>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default MobileMenu;
