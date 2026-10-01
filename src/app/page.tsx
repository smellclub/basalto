import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Place } from "@/components/sections/Place";
import { References } from "@/components/sections/References";
import { Disciplines } from "@/components/sections/Disciplines";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Booking } from "@/components/sections/Booking";
import { Location } from "@/components/sections/Location";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MobileBookingBar } from "@/components/ui/MobileBookingBar";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="contenido">
        <Hero />
        <Manifesto />
        <Place />
        <References />
        <Disciplines />
        <Process />
        <Team />
        <Booking />
        <Location />
        <Faq />
      </main>
      <Footer />
      <MobileBookingBar />
    </>
  );
}
