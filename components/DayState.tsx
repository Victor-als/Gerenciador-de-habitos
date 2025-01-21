// 'use client'

import Image from "next/image";

export default function DayState ({ day }: { day: boolean | undefined }) {
  let image: [string, string, number?] = ["/check.svg", "Check mark", 12];

  if(day === true) { 
    image = ["/true.svg", "Check green mark", 22] 
  }

  if(day === false) { 
    image = ["/false.svg", "Check red mark", 22] 
  }

  const [src, alt, size] = image;
  return (
    <div className="flex items-center justify-center h-9">
      <Image
       src={src} 
       width={size}
       height={size}
       alt={alt}
      />
    </div>
  );
};