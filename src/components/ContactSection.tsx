import { useState } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { STORE_CONFIG, buildWhatsAppUrl } from "../config/store";
import { FadeIn } from "./FadeIn";

const INQUIRY_TOPICS = [
  "Sizing & Fit Advice",
  "Product Availability",
  "Order Status",
  "Wholesale & Studio Partnerships",
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(INQUIRY_TOPICS[0]);
  const [message, setMessage] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const composedText = [
    `Hello Flexal Concierge,`,
    name.trim() ? `Name: ${name.trim()}` : "",
    `Topic: ${topic}`,
    message.trim()
      ? `Message: ${message.trim()}`
      : `I would like assistance with ${topic.toLowerCase()}.`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappInquiryUrl = buildWhatsAppUrl(composedText);
  const directChatUrl = buildWhatsAppUrl(
    "Hello Flexal, I would like to speak with your styling and order concierge."
  );

  const isFormReady = name.trim().length > 0 && message.trim().length > 0;

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FEFEFE]">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Studio Info */}
        <FadeIn className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#4A2D1D]/65">
              Contact
            </p>
            <h2 className="font-['Inter',sans-serif] font-bold tracking-tight text-3xl md:text-4xl text-[#4A2D1D] text-balance">
              Direct ordering and personal fit guidance
            </h2>
            <p className="text-sm leading-relaxed text-[#4A2D1D]/75">
              Prefer confirming measurements, fabric weight, or delivery timing before ordering?
              Connect directly with our team on WhatsApp for immediate responses.
            </p>
          </div>

          <div className="space-y-4 pt-2 border-t border-[#4A2D1D]/12 text-sm text-[#4A2D1D]/85">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#4A2D1D] mt-0.5 shrink-0" aria-hidden="true" />
              <span>{STORE_CONFIG.studioHours}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#4A2D1D] mt-0.5 shrink-0" aria-hidden="true" />
              <span>{STORE_CONFIG.studioLocation}</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#4A2D1D] mt-0.5 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${STORE_CONFIG.studioEmail}`}
                className="hover:underline underline-offset-4"
              >
                {STORE_CONFIG.studioEmail}
              </a>
            </div>
          </div>

          <a
            href={directChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-semibold text-[#4A2D1D] bg-[#FED5E6] hover:bg-[#F7BACA] rounded-lg transition-colors duration-150"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Start WhatsApp Chat</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </FadeIn>

        {/* Right Inquiry Composer */}
        <FadeIn delay={0.1} className="lg:col-span-7 bg-[#FED5E6]/55 border border-[#F7BACA] rounded-2xl p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="font-display text-2xl text-[#4A2D1D]">Send a WhatsApp Inquiry</h3>
            <p className="text-xs text-[#4A2D1D]/75">
              Complete the details below to open a pre-filled conversation with our team.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-[#4A2D1D] mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (showValidation) setShowValidation(false);
                  }}
                  placeholder="Lisa Gabriel"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FEFEFE] border border-[#4A2D1D]/15 rounded-lg text-[#4A2D1D] placeholder:text-[#4A2D1D]/40 focus:outline-none focus:border-[#4A2D1D]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-topic"
                  className="block text-xs font-semibold text-[#4A2D1D] mb-1.5"
                >
                  Inquiry Topic
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FEFEFE] border border-[#4A2D1D]/15 rounded-lg text-[#4A2D1D] focus:outline-none focus:border-[#4A2D1D] cursor-pointer"
                >
                  {INQUIRY_TOPICS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold text-[#4A2D1D] mb-1.5"
              >
                Message or Product Interest
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (showValidation) setShowValidation(false);
                }}
                placeholder="Share your preferred pieces, size questions, or delivery city..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#FEFEFE] border border-[#4A2D1D]/15 rounded-lg text-[#4A2D1D] placeholder:text-[#4A2D1D]/40 focus:outline-none focus:border-[#4A2D1D] resize-none"
              />
            </div>

            {showValidation && !isFormReady && (
              <p className="text-xs font-medium text-[#4A2D1D]">
                Please enter your name and message before opening WhatsApp.
              </p>
            )}

            <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
              {isFormReady ? (
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-[#FEFEFE] bg-[#4A2D1D] hover:bg-[#382115] rounded-lg transition-colors"
                >
                  <span>Continue to WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowValidation(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-[#FEFEFE] bg-[#4A2D1D] hover:bg-[#382115] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Continue to WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}

              <span className="text-xs text-[#4A2D1D]/60">
                Redirects directly to Flexal WhatsApp ordering
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
