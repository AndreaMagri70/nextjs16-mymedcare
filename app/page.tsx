import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import TopDoctors from "@/components/TopDoctors";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <Hero />
        <Stats />
        <Categories />
        <TopDoctors />
      </main>
    </div>
  );
}
