import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalPage title="Términos y condiciones">
      <p>
        Al agendar una reunión en este sitio aceptás estas condiciones. Si no estás de acuerdo, no
        uses el sistema de agenda.
      </p>

      <h2>Reuniones</h2>
      <ul>
        <li>La reunión queda agendada cuando ves la pantalla de confirmación.</li>
        <li>Te pedimos datos reales: con datos falsos podemos cancelar la reunión.</li>
        <li>Cada persona puede agendar hasta 5 reuniones por hora desde el sitio.</li>
        <li>Las reuniones por videollamada se coordinan por WhatsApp o email.</li>
      </ul>

      <h2>Cambios y cancelaciones</h2>
      <ul>
        <li>Para cancelar o cambiar la fecha, avisanos con al menos 24 horas de anticipación.</li>
        <li>
          Las visitas al terreno canceladas con menos de 24 horas pueden cobrarse si ya
          implicaron traslado.
        </li>
      </ul>

      <h2>Honorarios</h2>
      <p>
        La primera consulta no tiene costo. Los montos publicados para otras reuniones están en
        dólares estadounidenses y se pagan antes o el mismo día. Los honorarios de un proyecto se
        acuerdan por escrito en un contrato aparte; nada en este sitio es un presupuesto ni un
        compromiso de contratar. {business.name} puede actualizar los montos; se respeta el
        vigente al momento de agendar.
      </p>

      <h2>Datos personales</h2>
      <p>
        Tratamos tus datos según nuestra{" "}
        <Link href="/privacidad" className="text-accent underline">
          política de privacidad
        </Link>
        .
      </p>

      <h2>Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República Oriental del Uruguay, incluida la
        Ley N.º 17.250 de Relaciones de Consumo.
      </p>
    </LegalPage>
  );
}
