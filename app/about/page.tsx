"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Lightbulb, Target, Award } from "lucide-react"

export default function AboutPage() {
  const missionRef = useRef(null)
  const valuesRef = useRef(null)
  const teamRef = useRef(null)

  const missionInView = useInView(missionRef, { once: true, amount: 0.3 })
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 })
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 })

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-[#293e72]">Luxdada</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're on a mission to transform businesses through innovative AI solutions and digital transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Luxdada was founded with a clear vision: to harness the power of artificial intelligence and innovative
                software to transform how businesses operate in the digital age.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What began as a small team of passionate technologists has grown into a leading provider of AI-driven
                solutions across multiple industries, with a special focus on healthcare.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue to push the boundaries of what's possible, helping organizations of all sizes embrace
                digital transformation and unlock new levels of efficiency and innovation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=800&query=diverse team of technology professionals in modern office with blue accent lighting"
                  alt="Luxdada Team"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-gray-50" ref={missionRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600">Driving innovation and excellence through AI-powered solutions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-none shadow-md h-full bg-white">
                <CardContent className="p-8">
                  <div className="bg-[#293e72]/10 p-3 rounded-lg inline-block mb-4">
                    <Target className="h-8 w-8 text-[#293e72]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    To empower organizations with cutting-edge AI and software solutions that digitize and optimize
                    business processes, driving efficiency, innovation, and growth.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Transform business operations through technology",
                      "Make AI accessible and practical for all organizations",
                      "Deliver measurable results and ROI for our clients",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-none shadow-md h-full bg-white">
                <CardContent className="p-8">
                  <div className="bg-[#293e72]/10 p-3 rounded-lg inline-block mb-4">
                    <Lightbulb className="h-8 w-8 text-[#293e72]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    To be the global leader in AI-driven digital transformation, recognized for our innovation,
                    expertise, and the tangible impact we create for our clients and society.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Pioneer new applications of AI across industries",
                      "Revolutionize healthcare through specialized AI solutions",
                      "Create a future where technology enhances human potential",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-20 bg-white" ref={valuesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do at Luxdada.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Lightbulb className="h-8 w-8 text-[#293e72]" />,
                title: "Innovation",
                description:
                  "We constantly push boundaries and explore new possibilities in AI and software development.",
              },
              {
                icon: <Award className="h-8 w-8 text-[#293e72]" />,
                title: "Excellence",
                description: "We are committed to delivering the highest quality solutions and exceeding expectations.",
              },
              {
                icon: <Users className="h-8 w-8 text-[#293e72]" />,
                title: "Collaboration",
                description:
                  "We work closely with our clients, fostering partnerships built on trust and mutual success.",
              },
              {
                icon: <Target className="h-8 w-8 text-[#293e72]" />,
                title: "Impact",
                description: "We measure our success by the tangible results and value we create for our clients.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-none shadow-md hover-scale h-full">
                  <CardContent className="p-6 text-center">
                    <div className="bg-[#293e72]/10 p-3 rounded-full inline-block mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-gray-50" ref={teamRef}>
        <div className="container mx-auto px-4 min-w-[320px]">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600">The experts driving innovation and excellence at Luxdada.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                name: "Alex Morgan",
                title: "Chief Executive Officer",
                bio: "With over 20 years of experience in technology leadership, Alex drives Luxdada's vision and strategic direction.",
                image: "/placeholder.svg?height=400&width=400&query=professional headshot of male CEO in business attire",
              },
              {
                name: "Sophia Chen",
                title: "Chief Technology Officer",
                bio: "A pioneer in AI research and development, Sophia leads our technical innovation and product development.",
                image: "/placeholder.svg?height=400&width=400&query=professional headshot of female CTO in business casual attire",
              },
              {
                name: "David Patel",
                title: "Healthcare Solutions Director",
                bio: "With a background in both healthcare and technology, David spearheads our specialized healthcare AI initiatives.",
                image: "/placeholder.svg?height=400&width=400&query=professional headshot of male healthcare director in business attire",
              },
              {
                name: "Maria Rodriguez",
                title: "Chief Operations Officer",
                bio: "Maria ensures operational excellence across all aspects of Luxdada, from project delivery to client success.",
                image: "/placeholder.svg?height=400&width=400&query=professional headshot of female COO in business attire",
              },
              {
                name: "James Wilson",
                title: "Chief Innovation Officer",
                bio: "James focuses on identifying emerging technologies and trends to keep Luxdada at the cutting edge of AI.",
                image: "/placeholder.svg?height=400&width=400&query=professional headshot of male innovation officer in business casual attire",
              },
              {
                name: "Aisha Johnson",
                title: "Client Success Director",
                bio: "Aisha works closely with our clients to ensure our solutions deliver measurable business impact and ROI.",
                image: "/placeholder.svg?height=400&width=400&query=professional headshot of female client success director in business attire",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="w-full min-w-[280px]"
              >
                <Card className="border-none shadow-md hover-scale h-full bg-white">
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-3 sm:mb-4">
                      <Image 
                        src={member.image || "/placeholder.svg"} 
                        alt={member.name} 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3}
                      />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-[#293e72] font-medium text-sm sm:text-base mb-2">{member.title}</p>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/join-team.png"
            alt="Join our team background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#293e72]/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Team</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals who are passionate about AI and digital transformation.
                Explore career opportunities at Luxdada.
              </p>
              <Button className="bg-white text-[#293e72] hover:bg-gray-100 px-8 py-6 text-lg">
                View Open Positions
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
