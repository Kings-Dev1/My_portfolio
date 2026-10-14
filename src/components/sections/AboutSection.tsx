import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const biographySections = [
  {
    title: "Education & Medical Background",
    paragraphs: [
      "I graduated in Medicine and Surgery from Nnamdi Azikiwe University, Nigeria, in 2026. My medical education has been one of the most formative experiences in my journey, equipping me with the knowledge and discipline to approach complex problems systematically and make decisions grounded in evidence.",
      "Medical training has taught me to think critically, consider multiple possibilities, evaluate available information, and recognise the human consequences of decisions. It has also strengthened my appreciation for scientific inquiry, lifelong learning, and the responsibility that comes with working in healthcare.",
      "Beyond clinical practice, my medical background has shaped the questions I want to explore about the future of healthcare, particularly how technology and scientific research can improve clinical reasoning, decision-making, and the delivery of healthcare services.",
    ],
  },
  {
    title: "My Journey into Technology",
    paragraphs: [
      "My journey into technology began four years ago, driven by curiosity about how software works and how digital products can solve real-world problems. What began as an exploration of technology gradually developed into a sustained interest in software development, programming, and the systems behind the applications people use every day.",
      "My development journey has particularly involved web technologies, through which I have explored how applications are designed, structured, and built. Along the way, I have become increasingly interested in the relationship between software architecture, user experience, problem-solving, and the development of reliable digital products.",
      "My interests have expanded into Python programming, data science, and machine learning. I am working to strengthen my understanding of how data is processed, how algorithms identify patterns, how predictive models work, and how computational methods can be applied to practical problems.",
      "For me, technology is more than writing code. It is a means of transforming ideas into functional systems, exploring new possibilities, and developing solutions that can be useful, scalable, and impactful.",
    ],
  },
  {
    title: "Medicine, Artificial Intelligence & Research",
    paragraphs: [
      "One of my strongest professional interests lies at the intersection of medicine, artificial intelligence, and data science. My medical background gives me an appreciation of clinical problems, while my technical interests provide an opportunity to explore how computational approaches might help address them.",
      "I am particularly interested in clinical decision support, medical data intelligence, machine learning in healthcare, medical image analysis, and technologies that could help healthcare professionals interpret information and make better-informed decisions.",
      "I am also interested in how artificial intelligence can support clinical research, reveal patterns in complex datasets, and contribute to the development of new approaches to diagnosis and patient care. These possibilities raise important questions about scientific validation, reliability, clinical safety, and the responsible use of technology.",
      "My ambition is to develop the knowledge and practical skills needed to contribute meaningfully to this field. Rather than viewing medicine and technology as separate pursuits, I see an opportunity to bring clinical understanding, computational thinking, and scientific research together to investigate difficult problems and develop useful solutions.",
    ],
  },
  {
    title: "Entrepreneurship & Business",
    paragraphs: [
      "Beyond medicine and technology, I am an entrepreneur and co-founder of Real Kings Capital Investments Nigeria Limited. The company's interests span agriculture, real estate, and general merchandise, reflecting an interest in building businesses across different sectors of the economy.",
      "My interest in entrepreneurship comes from the opportunity to turn ideas into practical ventures, organise resources around shared objectives, and build systems that create sustainable value. I am interested in understanding how businesses operate, how opportunities are identified, and how thoughtful planning and effective execution contribute to long-term growth.",
      "I believe that building a successful enterprise requires more than identifying an opportunity. It requires sound judgement, consistency, responsible management, collaboration, and the ability to adapt as circumstances change.",
      "My long-term interest is in developing sustainable businesses that create opportunities, contribute to economic development, and establish a foundation for enduring value across generations.",
    ],
  },
  {
    title: "Extracurricular Activities & Personal Interests",
    paragraphs: [
      "Music is one of my greatest personal interests. Outside medicine, coding, and studying, I enjoy playing musical instruments and spending time appreciating good music. Playing music gives me an opportunity to express creativity in a different way and provides a welcome balance to my technical and academic pursuits.",
      "I play the piano and guitar, with interests in both acoustic and lead guitar. I enjoy the process of learning, practising, and developing the technique required to play an instrument well. Whenever I have time away from work and studying, you will often find me playing music or listening to something I enjoy.",
      "I also enjoy cycling, walking, and taking leisurely strolls. Spending time outdoors gives me an opportunity to unwind, clear my mind, and step away from the demands of my professional interests.",
      "Football is another activity I enjoy. Together, music, cycling, walking, and football provide a balance between intellectual work, creativity, physical activity, and personal recreation.",
    ],
  },
  {
    title: "Vision, Ambition & Long-Term Goals",
    paragraphs: [
      "My long-term ambition is to contribute to meaningful, potentially groundbreaking discoveries at the intersection of medicine, artificial intelligence, data science, and technology. I am fascinated by complex problems and the possibility that combining knowledge from different disciplines can reveal solutions that might otherwise remain unexplored.",
      "I want to continue developing the clinical understanding, scientific knowledge, and technical capabilities required to investigate important questions, evaluate new ideas rigorously, and translate promising research into practical applications.",
      "I am particularly interested in innovations that could improve healthcare, strengthen clinical decision-making, and expand our ability to understand and address medical challenges. I also want to build enterprises that turn useful ideas into sustainable systems and create opportunities for others.",
      "Ultimately, I aspire to build a body of work that combines scientific discovery, technological innovation, and entrepreneurship. My goal is not simply to achieve personal success, but to contribute knowledge, develop solutions to meaningful problems, and create a lasting positive impact through the things I build and the work I do.",
    ],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex items-center justify-center gap-3">
          <span className="h-px w-9 shrink-0 bg-accent" />

          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase sm:text-sm">
            About Me
          </p>

          <span className="h-px w-9 shrink-0 bg-accent" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              title="Different disciplines. One direction."
              description="I am a medical graduate, software developer, and entrepreneur with interests spanning medicine, artificial intelligence, research, and business. My work and learning are guided by a desire to solve meaningful problems and contribute to lasting progress."
              className="mx-auto"
            />

            <div className="border-t border-border pt-8">
              <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
                Roots & Background
              </h3>

              <p className="mt-4 text-sm leading-8 text-muted sm:text-base sm:leading-9">
                I am from Ebonyi State, southeastern Nigeria. My background
                is an important part of my story and perspective, and I aspire
                to use education, technology, and entrepreneurship to
                contribute meaningfully to society.
              </p>
            </div>
          </div>

          <div className="divide-y divide-border">
            {biographySections.map((section, index) => (
              <article
                key={section.title}
                className="space-y-5 py-10 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-1 text-xs font-medium tabular-nums text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {section.title}
                  </h3>
                </div>

                <div className="space-y-5 pl-8 text-sm leading-8 text-muted sm:text-base sm:leading-9">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}