"use client";

import { ChevronRight, Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
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
                <Link href={BASE_URL}>
                  <Image
                    src="/images/light-logo.svg"
                    width={110}
                    height={50}
                    alt="Diyet Takibim"
                  />
                </Link>
              </DrawerHeader>
              <DrawerBody>
                <div className="flex items-start flex-col  gap-2">
                  {routes.map((route, index) => {
                    const Icon = route.icon;
                    return (
                      <Link
                        key={index}
                        href={route.href}
                        onClick={onClose}
                        className="flex items-center gap-2 py-2 w-max text-base text-black hover:text-violet-500 dark:text-white dark:hover:text-violet-400 duration-100"
                      >
                        <Icon
                          width={14}
                          className="text-violet-500 dark:text-violet-400"
                        />
                        {route.text}
                      </Link>
                    );
                  })}
                  <div className="flex flex-col gap-4 w-full mt-4">
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
