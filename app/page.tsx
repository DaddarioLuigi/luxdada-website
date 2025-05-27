"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, LineChart, Stethoscope, Zap, Shield, ArrowRight, CheckCircle } from "lucide-react"

export default function Home() {
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)

  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 })

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#293e72]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-[#293e72]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Driving Innovation <span className="text-[#293e72]">with AI, Respecting Humanity</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Luxdada transforms your business processes through software and AI, always respecting ethics, honesty, and the human touch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white px-8 py-6 text-lg">Get Started</Button>
                <Button
                  variant="outline"
                  className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/10 px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }} 
              className="relative"
            >
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/neural-network-blueprint.png"
                  alt="AI Technology Visualization"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#293e72]/10 p-2 rounded-full">
                    <Brain className="h-6 w-6 text-[#293e72]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">AI-Powered</p>
                    <p className="text-xs text-gray-500">Smart Solutions</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#293e72]/10 p-2 rounded-full">
                    <Stethoscope className="h-6 w-6 text-[#293e72]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Healthcare Focus</p>
                    <p className="text-xs text-gray-500">Specialized Solutions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-500 font-medium">TRUSTED BY INDUSTRY LEADERS (Test)</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div className="h-12 w-32 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500 font-medium">Client {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Innovative Solutions for Modern Businesses
            </h2>
            <p className="text-xl text-gray-600">
              We combine cutting-edge technology with industry expertise to deliver transformative results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-[#293e72]" />,
                title: "AI Consulting",
                description: "Strategic guidance on implementing AI solutions tailored to your business needs.",
              },
              {
                icon: <Code className="h-8 w-8 text-[#293e72]" />,
                title: "Custom Software Development",
                description: "Bespoke software solutions designed to streamline your operations and boost efficiency.",
              },
              {
                icon: <Stethoscope className="h-8 w-8 text-[#293e72]" />,
                title: "Healthcare AI Solutions",
                description:
                  "Specialized AI applications for healthcare providers to improve patient care and outcomes.",
              },
              {
                icon: <LineChart className="h-8 w-8 text-[#293e72]" />,
                title: "Data Analytics",
                description: "Transform your data into actionable insights with our advanced analytics solutions.",
              },
              {
                icon: <Zap className="h-8 w-8 text-[#293e72]" />,
                title: "Process Automation",
                description: "Automate repetitive tasks and workflows to increase productivity and reduce errors.",
              },
              {
                icon: <Shield className="h-8 w-8 text-[#293e72]" />,
                title: "Secure Integration",
                description:
                  "Seamlessly integrate AI solutions with your existing systems with enterprise-grade security.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-none shadow-md hover-scale h-full">
                  <CardContent className="p-6">
                    <div className="bg-[#293e72]/10 p-3 rounded-lg inline-block mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Focus Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Revolutionizing Healthcare with AI
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At Luxdada, we believe AI can significantly improve quality of life and daily work in the healthcare
                  sector. Our specialized solutions help healthcare providers:
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Enhance diagnostic accuracy and speed",
                    "Streamline administrative workflows",
                    "Improve patient care coordination",
                    "Optimize resource allocation",
                    "Ensure data security and compliance",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">
                  Explore Healthcare Solutions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
                  <Image src="/connected-care.png" alt="Healthcare AI Solutions" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#293e72]/10 p-2 rounded-full">
                      <Stethoscope className="h-6 w-6 text-[#293e72]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Healthcare Focus</p>
                      <p className="text-xs text-gray-500">AI-Driven Solutions</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#293e72]" ref={statsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {[
              { value: "95%", label: "Client Satisfaction" },
              { value: "40+", label: "Enterprise Clients" },
              { value: "150+", label: "Projects Completed" },
              { value: "30%", label: "Efficiency Improvement" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-lg text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">
              See how our solutions have transformed businesses across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Healthcare Provider Efficiency",
                category: "Healthcare",
                image: "/digital-hospital-scene.png",
              },
              {
                title: "Financial Services Automation",
                category: "Finance",
                image: "/fintech-dashboard-overview.png",
              },
              {
                title: "Manufacturing Process Optimization",
                category: "Manufacturing",
                image: "/automated-assembly-line.png",
              },
            ].map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
                className="group"
              >
                <Link href="/case-studies">
                  <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="text-sm font-medium text-white bg-[#293e72] px-3 py-1 rounded-full">
                        {study.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#293e72] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 mb-3">See how we transformed operations and improved efficiency.</p>
                  <span className="text-[#293e72] font-medium flex items-center">
                    Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/10">
              View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Hear from organizations that have transformed their operations with Luxdada.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Luxdada's AI solutions have revolutionized our patient management system, reducing administrative time by 40% and improving patient satisfaction scores.",
                name: "Dr. Sarah Johnson",
                title: "Chief Medical Officer",
                company: "Metro Health Systems",
              },
              {
                quote:
                  "The custom software developed by Luxdada has streamlined our financial operations and provided unprecedented insights into our business performance.",
                name: "Michael Chen",
                title: "CFO",
                company: "Global Finance Partners",
              },
              {
                quote:
                  "Working with Luxdada has been transformative for our manufacturing processes. Their AI-driven optimization has increased our production efficiency by 35%.",
                name: "Robert Martinez",
                title: "Operations Director",
                company: "Advanced Manufacturing Co.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-none shadow-md h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 text-[#293e72]">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className="text-[#293e72]">
                            ★
                          </span>
                        ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[#293e72]/20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-[#293e72] font-bold">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">
                          {testimonial.title}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#293e72]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Business with AI?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Let's discuss how Luxdada can help you digitize and optimize your business processes with cutting-edge
                AI solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#293e72] hover:bg-gray-100 px-8 py-6 text-lg">
                  Schedule a Consultation
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  View Our Solutions
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
