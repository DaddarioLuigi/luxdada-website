"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Stethoscope, Briefcase, Factory, ShoppingBag, ChevronRight } from "lucide-react"

export default function CaseStudiesPage() {
  const casesRef = useRef(null)
  const casesInView = useInView(casesRef, { once: true, amount: 0.3 })

  const caseStudies = [
    {
      title: "AI-Powered Diagnostic Support for Regional Hospital Network",
      category: "Healthcare",
      icon: <Stethoscope className="h-5 w-5" />,
      image: "/digital-hospital-scene.png",
      summary:
        "Implemented an AI-based diagnostic support system that improved diagnostic accuracy by 28% and reduced time to diagnosis by 35%.",
      results: [
        "28% improvement in diagnostic accuracy",
        "35% reduction in time to diagnosis",
        "22% decrease in unnecessary tests",
        "Improved patient satisfaction scores by 18%",
      ],
    },
    {
      title: "Automated Fraud Detection for Financial Services Firm",
      category: "Finance",
      icon: <Briefcase className="h-5 w-5" />,
      image: "/fintech-dashboard-overview.png",
      summary:
        "Developed a machine learning-based fraud detection system that reduced fraudulent transactions by 92% and saved the company $4.5M annually.",
      results: [
        "92% reduction in fraudulent transactions",
        "$4.5M annual cost savings",
        "63% faster fraud detection",
        "Reduced false positives by 45%",
      ],
    },
    {
      title: "Predictive Maintenance System for Manufacturing Plant",
      category: "Manufacturing",
      icon: <Factory className="h-5 w-5" />,
      image: "/automated-assembly-line.png",
      summary:
        "Implemented a predictive maintenance system that reduced equipment downtime by 47% and maintenance costs by 32%.",
      results: [
        "47% reduction in equipment downtime",
        "32% decrease in maintenance costs",
        "18% increase in production efficiency",
        "ROI achieved within 8 months",
      ],
    },
    {
      title: "Personalized Customer Experience Platform for Retail Chain",
      category: "Retail",
      icon: <ShoppingBag className="h-5 w-5" />,
      image:
        "/placeholder.svg?height=600&width=800&query=modern retail store with digital displays and technology integration",
      summary:
        "Developed a personalized recommendation engine that increased average order value by 24% and customer retention by 18%.",
      results: [
        "24% increase in average order value",
        "18% improvement in customer retention",
        "32% higher engagement with personalized offers",
        "15% increase in overall revenue",
      ],
    },
    {
      title: "Patient Flow Optimization for Urban Medical Center",
      category: "Healthcare",
      icon: <Stethoscope className="h-5 w-5" />,
      image:
        "/placeholder.svg?height=600&width=800&query=busy hospital waiting room with digital patient management system",
      summary:
        "Implemented an AI-driven patient flow system that reduced wait times by 42% and improved resource utilization by 35%.",
      results: [
        "42% reduction in patient wait times",
        "35% improvement in resource utilization",
        "28% increase in patient throughput",
        "Improved staff satisfaction scores by 22%",
      ],
    },
    {
      title: "Supply Chain Optimization for Global Manufacturer",
      category: "Manufacturing",
      icon: <Factory className="h-5 w-5" />,
      image:
        "/placeholder.svg?height=600&width=800&query=global supply chain visualization with logistics and shipping",
      summary:
        "Developed an AI-powered supply chain optimization system that reduced inventory costs by 27% and improved delivery times by 31%.",
      results: [
        "27% reduction in inventory costs",
        "31% improvement in delivery times",
        "18% decrease in supply chain disruptions",
        "$3.2M annual savings in operational costs",
      ],
    },
  ]

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-[#293e72]">Success Stories</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover how our AI and digital transformation solutions have delivered measurable results for
                organizations across industries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 md:py-20 bg-white" ref={casesRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={casesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group"
              >
                <Card className="border-none shadow-md hover-scale h-full overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="text-sm font-medium text-white bg-[#293e72] px-3 py-1 rounded-full flex items-center">
                        {study.icon}
                        <span className="ml-1">{study.category}</span>
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#293e72] transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{study.summary}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Results:</h4>
                      <ul className="space-y-1">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-start text-gray-700">
                            <ChevronRight className="h-4 w-4 text-[#293e72] mr-1 flex-shrink-0 mt-1" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={`/case-studies/${index + 1}`} className="text-[#293e72] font-medium flex items-center">
                      Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Overview Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Measurable Impact</h2>
              <p className="text-xl text-gray-600">
                Our solutions deliver tangible results across key performance indicators.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "35%", label: "Average Efficiency Improvement" },
              { value: "42%", label: "Average Cost Reduction" },
              { value: "28%", label: "Average Revenue Increase" },
              { value: "8 mo.", label: "Average ROI Timeline" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card className="border-none shadow-md h-full text-center p-8">
                  <CardContent className="p-0">
                    <div className="text-[#293e72] font-bold text-5xl mb-4">{stat.value}</div>
                    <p className="text-gray-700 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
              <p className="text-xl text-gray-600">
                Hear directly from our clients about their experience working with Luxdada.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Luxdada's AI solutions have revolutionized our patient management system. The team's expertise and dedication to understanding our unique challenges resulted in a solution that exceeded our expectations.",
                name: "Dr. Sarah Johnson",
                title: "Chief Medical Officer",
                company: "Metro Health Systems",
              },
              {
                quote:
                  "The custom software developed by Luxdada has transformed our financial operations. Their team took the time to understand our business needs and delivered a solution that has had a significant impact on our bottom line.",
                name: "Michael Chen",
                title: "CFO",
                company: "Global Finance Partners",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card className="border-none shadow-md h-full">
                  <CardContent className="p-8">
                    <div className="mb-6 text-[#293e72]">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className="text-[#293e72]">
                            ★
                          </span>
                        ))}
                    </div>
                    <p className="text-lg text-gray-700 mb-8 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-[#293e72]/20 rounded-full flex items-center justify-center mr-4">
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
      <section className="py-16 md:py-20 bg-[#293e72]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Achieve Similar Results?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss how our AI and digital solutions can help you transform your business and
                achieve measurable results.
              </p>
              <Button className="bg-white text-[#293e72] hover:bg-gray-100 px-8 py-6 text-lg">
                Schedule a Consultation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
