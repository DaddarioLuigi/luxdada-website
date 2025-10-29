"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, interest: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would send the form data to your backend
    console.log("Form submitted:", formState)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get in <span className="text-[#293e72]">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Have questions about our AI solutions or want to discuss your project? We're here to help.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below, and one of our experts will get back to you within 24 hours to discuss how we
                can help with your AI and digital transformation needs.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-[#293e72]/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-[#293e72]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@luxdada.it</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#293e72]/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-[#293e72]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+39 392 484 2124</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Orari</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Lunedì - Venerdì:</span>
                    <span className="text-gray-900">09:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sabato:</span>
                    <span className="text-gray-900">10:00 - 14:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Domenica:</span>
                    <span className="text-gray-900">Chiuso</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="bg-[#293e72]/10 p-4 rounded-full inline-flex items-center justify-center mb-6">
                        <CheckCircle className="h-12 w-12 text-[#293e72]" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
                      <p className="text-lg text-gray-600 mb-6">
                        Your message has been received. One of our team members will get back to you within 24 hours.
                      </p>
                      <Button
                        className="bg-[#293e72] hover:bg-[#1e2e57] text-white"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="border-gray-300 focus:border-[#293e72] focus:ring-[#293e72]"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="border-gray-300 focus:border-[#293e72] focus:ring-[#293e72]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="company" className="text-sm font-medium text-gray-700">
                            Company Name
                          </label>
                          <Input
                            id="company"
                            name="company"
                            value={formState.company}
                            onChange={handleChange}
                            placeholder="Your Company"
                            className="border-gray-300 focus:border-[#293e72] focus:ring-[#293e72]"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                            className="border-gray-300 focus:border-[#293e72] focus:ring-[#293e72]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="interest" className="text-sm font-medium text-gray-700">
                          I'm interested in <span className="text-red-500">*</span>
                        </label>
                        <Select required onValueChange={handleSelectChange} defaultValue={formState.interest}>
                          <SelectTrigger className="border-gray-300 focus:border-[#293e72] focus:ring-[#293e72]">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ai-consulting">AI Consulting</SelectItem>
                            <SelectItem value="custom-software">Custom Software Development</SelectItem>
                            <SelectItem value="healthcare-solutions">Healthcare AI Solutions</SelectItem>
                            <SelectItem value="data-analytics">Data Analytics</SelectItem>
                            <SelectItem value="process-automation">Process Automation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project or inquiry..."
                          required
                          rows={5}
                          className="border-gray-300 focus:border-[#293e72] focus:ring-[#293e72]"
                        />
                      </div>

                      <Button type="submit" className="bg-[#293e72] hover:bg-[#1e2e57] text-white w-full py-6">
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89545.77729942316!2d9.102486335546863!3d45.46426987107542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c1493f1275e7%3A0x3cffcd13c6740e8d!2sMilano%2C%20Italy!5e0!3m2!1sen!2sit!4v1709647300000!5m2!1sen!2sit"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions about our services and process.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What industries do you specialize in?",
                answer:
                  "While we serve clients across various industries, we have particular expertise in healthcare, finance, manufacturing, and retail. Our AI solutions are customized to address the specific challenges and opportunities in each sector.",
              },
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary depending on scope and complexity. A small-scale implementation might take 4-8 weeks, while more comprehensive digital transformation initiatives can span 3-6 months or longer. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you offer ongoing support after implementation?",
                answer:
                  "Yes, we provide comprehensive support and maintenance services after implementation. We offer various support packages to ensure your solutions continue to perform optimally and evolve with your business needs.",
              },
              {
                question: "How do you ensure data security and privacy?",
                answer:
                  "Data security is a top priority. We implement industry-leading security measures, comply with relevant regulations (like HIPAA for healthcare), and follow best practices for data protection. We'll work with your team to ensure all security requirements are met.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card className="border-none shadow-md h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Schedule a consultation with our experts to discuss how our AI and digital solutions can help you
                achieve your business goals.
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
