import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const companies = {
  abc: {
    name: "Company ABC",
    industry: "Tech",
    email: "contact@abc.com",
    description: "Company ABC is a leading company in the tech industry, providing innovative solutions.",
    location: "New York, USA",
  },
  xyz: {
    name: "Company XYZ",
    industry: "Finance",
    email: "contact@xyz.com",
    description: "Company XYZ offers financial services and solutions to both individuals and businesses.",
    location: "London, UK",
  },
  "123": {
    name: "Company 123",
    industry: "Marketing",
    email: "contact@123.com",
    description: "Company 123 is a global marketing agency.",
    location: "Sydney, Australia",
  },
  "456": {
    name: "Company 456",
    industry: "Retail",
    email: "contact@456.com",
    description: "Company 456 is a leading retailer with multiple locations worldwide.",
    location: "Paris, France",
  },
  "789": {
    name: "Company 789",
    industry: "Healthcare",
    email: "contact@789.com",
    description: "Company 789 is a healthcare provider focused on wellness.",
    location: "Berlin, Germany",
  },
}

interface CompanyProfileProps {
  params: {
    companyId: string
  }
}

export default function CompanyProfile({ params }: CompanyProfileProps) {
  const company = companies[params.companyId as keyof typeof companies]

  if (!company) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg border border-gray-800 shadow-xl p-8">
            {/* Company Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-400">
                <span className="text-3xl font-bold text-cyan-400">{company.name.charAt(0)}</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{company.name}</h1>
              <p className="text-cyan-400 text-xl font-medium">{company.industry}</p>
            </div>

            {/* Company Details */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-cyan-400 uppercase tracking-wide mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{company.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-cyan-400 uppercase tracking-wide mb-2">Location</h3>
                  <p className="text-white">{company.location}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-cyan-400 uppercase tracking-wide mb-2">Industry</h3>
                  <p className="text-white">{company.industry}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-cyan-400 uppercase tracking-wide mb-2">Contact</h3>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                  >
                    {company.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-800">
              <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
                <Link href="/internships">View Internships</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
              >
                <Link href={`mailto:${company.email}`}>Contact Company</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
