import { Settings, Wrench } from 'lucide-react'

// Force dynamic rendering (required for cookies/auth)
export const dynamic = 'force-dynamic'

export default async function MaintenancePage() {
  // Always show the maintenance page when accessed
  // The middleware handles the redirect logic
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <Wrench className="w-12 h-12 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <Settings className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          We'll Be Right Back!
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          Our website is currently undergoing scheduled maintenance to bring you a better experience.
        </p>

        {/* Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">What's Happening?</h3>
                <p className="text-gray-600">We're performing system updates and improvements to serve you better.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">When Will We Return?</h3>
                <p className="text-gray-600">We expect to be back online shortly. Thank you for your patience!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Need Immediate Assistance?</h3>
                <p className="text-gray-600">
                  Please email us at{' '}
                  <a href="mailto:info@approvu.com" className="text-primary hover:underline font-semibold">
                    info@approvu.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500">
          We appreciate your understanding and apologize for any inconvenience.
        </p>
      </div>
    </div>
  )
}
