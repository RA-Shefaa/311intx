import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
          {/* Hero Image */}
          <div className="flex-1 max-w-2xl">
            <Image
              src="/images/internx-hero.jpg"
              alt="InternX - Unlock Your Internship Experience"
              width={800}
              height={600}
              className="rounded-2xl shadow-2xl shadow-cyan-500/20 w-full h-auto"
              priority
            />
          </div>

          {/* Call to Action */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Your <span className="text-cyan-400">Internship</span> Journey Starts Here
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              The <span className="text-yellow-400 font-semibold">X-Factor</span> to Your Future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
                <Link href="/internships">Find Internships</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
