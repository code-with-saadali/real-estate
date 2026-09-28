import Image from "next/image";

export default function BrandLogo() {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 md:gap-2.5" aria-label="Vistelya">
      <Image
        src="/vistelya-mark.svg"
        alt=""
        width={48}
        height={48}
        className="h-8 w-8 md:h-9 md:w-9"
      />
      <span className="text-[23px] leading-none font-medium text-[#1C1C1A] md:text-[28px]">
        Vistelya
      </span>
    </span>
  );
}
