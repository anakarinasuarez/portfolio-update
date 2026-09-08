import type { Lang } from "@/components/i18n/lang";

/* Textos del asistente en los dos idiomas. Aquí no hay lógica: solo copy, para
   que traducir o afinar una frase no obligue a leer el componente. */

export type ChatCopy = {
  title: string;
  sub: string;
  greeting: string;
  chips: string[];
  placeholder: string;
  send: string;
  open: string;
  confirm: string;
  pickSlot: string;
  booked: string;
  bookedSlot: string;
  needMore: string;
  errorBusy: string;
  errorNoAPI: string;
  error: string;
  thinking: string;
};

export const CHAT_COPY: Record<Lang, ChatCopy> = {
  en: {
    title: "Ana's Assistant",
    sub: "Ask anything · Book an interview",
    greeting:
      "Hi! 👋 I'm Ana Karina's assistant. Ask me about her work, AI-agent experience or stack, or I can help you book an interview, video call or phone call with her.",
    chips: ["What's her AI experience?", "Book a call or interview", "Tech stack?"],
    placeholder: "Type your message…",
    send: "Send",
    open: "Chat with Ana's assistant",
    confirm: "Confirm & send request to Ana",
    pickSlot: "Pick a time in Ana's calendar",
    booked: "Request ready, your email app will open so Ana receives the details. ✅",
    bookedSlot: "All set — just pick a time that suits you in Ana's calendar. ✅",
    needMore:
      "Almost there — to book I still need your name, your email, the topic and the format (video call, phone call or in person).",
    errorBusy:
      "I'm getting a lot of messages right now. Give it a few seconds and send that again.",
    errorNoAPI: "The live assistant isn't available here. You can email Ana directly:",
    error: "Sorry, something went wrong. You can also email Ana directly:",
    thinking: "Thinking…",
  },
  es: {
    title: "Asistente de Ana",
    sub: "Pregunta lo que quieras · Agenda una entrevista",
    greeting:
      "¡Hola! 👋 Soy el asistente de Ana Karina. Pregúntame por su trabajo, su experiencia con agentes de IA o su stack, o te ayudo a agendar una entrevista, videollamada o llamada telefónica con ella.",
    chips: ["¿Qué experiencia tiene con IA?", "Agendar llamada o entrevista", "¿Su stack técnico?"],
    placeholder: "Escribe tu mensaje…",
    send: "Enviar",
    open: "Chatea con el asistente de Ana",
    confirm: "Confirmar y enviar solicitud a Ana",
    pickSlot: "Elegir hora en el calendario de Ana",
    booked: "Solicitud lista, se abrirá tu correo para que Ana reciba los detalles. ✅",
    bookedSlot: "Listo — solo falta que elijas la hora que mejor te venga en el calendario de Ana. ✅",
    needMore:
      "Casi está — para agendar aún me faltan tu nombre, tu correo, el tema y el formato (videollamada, llamada o presencial).",
    errorBusy:
      "Estoy recibiendo muchos mensajes ahora mismo. Espera unos segundos y vuelve a enviarlo.",
    errorNoAPI: "El asistente en vivo no está disponible aquí. Puedes escribir a Ana directamente:",
    error: "Lo siento, algo salió mal. También puedes escribir a Ana directamente:",
    thinking: "Pensando…",
  },
};
