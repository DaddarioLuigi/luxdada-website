"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Code,
  LineChart,
  Stethoscope,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Factory,
  ShoppingBag,
  Lightbulb,
  Target,
  Users,
} from "lucide-react"

export default function SolutionsPage() {
  const solutionsRef = useRef(null)
  const industriesRef = useRef(null)

  const solutionsInView = useInView(solutionsRef, { once: true, amount: 0.3 })
  const industriesInView = useInView(industriesRef, { once: true, amount: 0.3 })

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-[#293e72]">Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Innovative AI and software solutions designed to transform your business processes and drive growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Overview Section */}
      <section className="py-16 md:py-20 bg-white" ref={solutionsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Digital Solutions</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              From AI consulting to custom software development, we offer end-to-end solutions to meet your business
              needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-[#293e72]" />,
                title: "AI Consulting",
                description:
                  "Strategic guidance on implementing AI solutions tailored to your business needs and objectives.",
                features: [
                  "AI readiness assessment",
                  "Strategic roadmap development",
                  "Use case identification",
                  "ROI analysis and planning",
                ],
              },
              {
                icon: <Code className="h-8 w-8 text-[#293e72]" />,
                title: "Custom Software Development",
                description: "Bespoke software solutions designed to streamline your operations and boost efficiency.",
                features: [
                  "Custom application development",
                  "Legacy system modernization",
                  "API development and integration",
                  "Cloud-native solutions",
                ],
              },
              {
                icon: <Stethoscope className="h-8 w-8 text-[#293e72]" />,
                title: "Healthcare AI Solutions",
                description:
                  "Specialized AI applications for healthcare providers to improve patient care and outcomes.",
                features: [
                  "Clinical decision support",
                  "Patient flow optimization",
                  "Predictive analytics",
                  "Administrative automation",
                ],
              },
              {
                icon: <LineChart className="h-8 w-8 text-[#293e72]" />,
                title: "Data Analytics",
                description: "Transform your data into actionable insights with our advanced analytics solutions.",
                features: [
                  "Business intelligence dashboards",
                  "Predictive modeling",
                  "Data visualization",
                  "Real-time analytics",
                ],
              },
              {
                icon: <Zap className="h-8 w-8 text-[#293e72]" />,
                title: "Process Automation",
                description: "Automate repetitive tasks and workflows to increase productivity and reduce errors.",
                features: [
                  "Workflow automation",
                  "Robotic process automation (RPA)",
                  "Document processing",
                  "Intelligent automation",
                ],
              },
              {
                icon: <Shield className="h-8 w-8 text-[#293e72]" />,
                title: "Secure Integration",
                description:
                  "Seamlessly integrate AI solutions with your existing systems with enterprise-grade security.",
                features: [
                  "Secure API development",
                  "Legacy system integration",
                  "Data security and compliance",
                  "Continuous monitoring",
                ],
              },
            ].map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <Card className="border-none shadow-md hover-scale h-full bg-white">
                  <CardContent className="p-4 sm:p-5 md:p-6">
                    <div className="bg-[#293e72]/10 p-3 rounded-lg inline-block mb-4">{solution.icon}</div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                    <p className="text-base sm:text-lg text-gray-600 mb-4">{solution.description}</p>
                    <ul className="space-y-2">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Focus Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Healthcare AI Solutions</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Luxdada, we have a special focus on the healthcare sector, believing that AI can significantly
                improve quality of life and daily work for healthcare professionals and patients alike.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our specialized healthcare AI solutions are designed to address the unique challenges faced by
                healthcare providers, from clinical decision support to administrative efficiency.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Clinical decision support systems that enhance diagnostic accuracy",
                  "Patient flow optimization to reduce wait times and improve care delivery",
                  "Administrative automation to reduce paperwork and free up staff time",
                  "Predictive analytics for resource planning and patient outcomes",
                  "Secure integration with existing healthcare IT systems",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">
                Learn More About Healthcare Solutions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
                  src="/placeholder.svg?height=800&width=800&query=healthcare professionals using AI technology with digital medical interface"
                  alt="Healthcare AI Solutions"
                  fill
                  className="object-cover"
                />
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
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-20 bg-white" ref={industriesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={industriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600">
              Our AI and digital transformation solutions are tailored to meet the unique needs of various industries.
            </p>
          </motion.div>

          <Tabs defaultValue="healthcare" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto mb-8">
              <TabsTrigger
                value="healthcare"
                className="data-[state=active]:bg-[#293e72] data-[state=active]:text-white py-3"
              >
                <Stethoscope className="h-5 w-5 mr-2" /> Healthcare
              </TabsTrigger>
              <TabsTrigger
                value="finance"
                className="data-[state=active]:bg-[#293e72] data-[state=active]:text-white py-3"
              >
                <Briefcase className="h-5 w-5 mr-2" /> Finance
              </TabsTrigger>
              <TabsTrigger
                value="manufacturing"
                className="data-[state=active]:bg-[#293e72] data-[state=active]:text-white py-3"
              >
                <Factory className="h-5 w-5 mr-2" /> Manufacturing
              </TabsTrigger>
              <TabsTrigger
                value="retail"
                className="data-[state=active]:bg-[#293e72] data-[state=active]:text-white py-3"
              >
                <ShoppingBag className="h-5 w-5 mr-2" /> Retail
              </TabsTrigger>
            </TabsList>

            <TabsContent value="healthcare" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Healthcare Solutions</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Our healthcare-focused AI solutions help providers improve patient care, optimize operations, and
                    reduce administrative burden.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Clinical decision support systems",
                      "Patient flow optimization",
                      "Predictive analytics for patient outcomes",
                      "Administrative process automation",
                      "Secure healthcare data integration",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">Explore Healthcare Solutions</Button>
                </div>
                <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=700&width=700&query=healthcare professionals using digital technology in hospital setting"
                    alt="Healthcare Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="finance" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Services Solutions</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Our AI-powered financial solutions help institutions enhance customer experience, improve risk
                    management, and streamline operations.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Fraud detection and prevention",
                      "Automated customer service",
                      "Risk assessment and management",
                      "Process automation for financial operations",
                      "Personalized financial recommendations",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">Explore Financial Solutions</Button>
                </div>
                <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=700&width=700&query=financial technology dashboard with charts and data visualization"
                    alt="Financial Services Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manufacturing" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Manufacturing Solutions</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Our manufacturing solutions leverage AI to optimize production processes, improve quality control,
                    and enhance supply chain management.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Predictive maintenance",
                      "Quality control automation",
                      "Supply chain optimization",
                      "Production planning and scheduling",
                      "Energy efficiency management",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">
                    Explore Manufacturing Solutions
                  </Button>
                </div>
                <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=700&width=700&query=modern manufacturing facility with robotic automation and digital controls"
                    alt="Manufacturing Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="retail" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Retail Solutions</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Our retail-focused solutions help businesses enhance customer experience, optimize inventory
                    management, and drive sales growth.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Personalized customer recommendations",
                      "Inventory optimization",
                      "Demand forecasting",
                      "Customer behavior analytics",
                      "Omnichannel experience enhancement",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">Explore Retail Solutions</Button>
                </div>
                <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=700&width=700&query=modern retail store with digital displays and technology integration"
                    alt="Retail Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Implementation Process</h2>
              <p className="text-xl text-gray-600">
                A structured approach to delivering successful AI and digital transformation solutions.
              </p>
            </motion.div>
          </div>

          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#293e72]/20 transform -translate-x-1/2"></div>

            <div className="space-y-12 relative">
              {[
                {
                  title: "Discovery & Assessment",
                  description:
                    "We begin by understanding your business needs, challenges, and objectives to identify the right AI and digital solutions.",
                  icon: <Lightbulb className="h-6 w-6 text-white" />,
                },
                {
                  title: "Strategy & Planning",
                  description:
                    "We develop a comprehensive roadmap outlining the implementation strategy, timeline, and expected outcomes.",
                  icon: <Target className="h-6 w-6 text-white" />,
                },
                {
                  title: "Development & Integration",
                  description:
                    "Our team designs and develops custom solutions, ensuring seamless integration with your existing systems.",
                  icon: <Code className="h-6 w-6 text-white" />,
                },
                {
                  title: "Testing & Optimization",
                  description:
                    "We rigorously test all solutions to ensure they meet quality standards and optimize for performance.",
                  icon: <Zap className="h-6 w-6 text-white" />,
                },
                {
                  title: "Deployment & Training",
                  description:
                    "We deploy the solution and provide comprehensive training to ensure your team can effectively utilize it.",
                  icon: <Users className="h-6 w-6 text-white" />,
                },
                {
                  title: "Ongoing Support & Evolution",
                  description:
                    "We provide continuous support and regularly update your solutions to adapt to changing business needs.",
                  icon: <Shield className="h-6 w-6 text-white" />,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="md:w-1/2 flex justify-center md:justify-end md:pr-12 md:pl-0 pl-12">
                    <div className={`${index % 2 === 0 ? "md:text-left" : "md:text-right"} max-w-md`}>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-base sm:text-lg text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-0 md:left-1/2 top-4 md:top-6 transform md:-translate-x-1/2 flex items-center justify-center">
                    <div className="bg-[#293e72] rounded-full p-3 z-10 relative">
                      {step.icon}
                    </div>
                  </div>

                  <div className="md:w-1/2 md:pl-12 md:pr-0 pr-12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#293e72]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss how our AI and digital solutions can help you achieve your business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#293e72] hover:bg-gray-100 px-8 py-6 text-lg">
                  Schedule a Consultation
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  View Case Studies
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
