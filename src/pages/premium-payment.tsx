import '../App.css'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { premiumCourse, setPremiumEnrollment } from '../lib/premiumCourse'

export default function PremiumPayment() {
  const navigate = useNavigate()

  const completePayment = () => {
    setPremiumEnrollment(true)
    navigate('/home')
  }

  return (
    <div className="premium-page-root premium-payment-root">
      <AppHeader
        title="Complete Your Enrollment"
        subtitle={premiumCourse.title}
        backLabel="Back to Home"
        onBack={() => navigate('/home')}
      />

      <main className="payment-layout">
        <section className="payment-card payment-summary-card">
          <h2>Order Summary</h2>
          <div className="payment-course-title">{premiumCourse.title}</div>
          <p className="payment-course-copy">
            Comprehensive course with {premiumCourse.modules} modules and {premiumCourse.lessons} lessons
          </p>

          <div className="payment-divider" />

          <div className="payment-line-item">
            <span>Course Price</span>
            <span>£{premiumCourse.price}.00</span>
          </div>
          <div className="payment-line-item">
            <span>Tax</span>
            <span>£0.00</span>
          </div>
          <div className="payment-line-item payment-line-total">
            <span>Total</span>
            <span>£{premiumCourse.price}.00</span>
          </div>

          <div className="payment-includes-box">
            <div className="payment-includes-title">What&apos;s Included:</div>
            {premiumCourse.includes.map(item => (
              <div key={item} className="payment-include-item">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="payment-card payment-form-card">
          <h2>Payment Information</h2>
          <p className="payment-course-copy">Enter your card details to complete enrollment</p>

          <label className="payment-label">
            Cardholder Name
            <input className="payment-input" defaultValue="John Doe" />
          </label>

          <label className="payment-label">
            Card Number
            <input className="payment-input" defaultValue="1234 5678 9012 3456" />
          </label>

          <div className="payment-row">
            <label className="payment-label">
              Expiry Date
              <input className="payment-input" defaultValue="MM/YY" />
            </label>
            <label className="payment-label">
              CVV
              <input className="payment-input" defaultValue="123" />
            </label>
          </div>

          <div className="payment-security-box">
            Your payment information is secure and encrypted. We never store your full card details.
          </div>

          <button className="payment-submit-btn" onClick={completePayment}>
            Complete Payment - £{premiumCourse.price}.00
          </button>

          <p className="payment-terms">
            By completing your purchase, you agree to our Terms of Service and Privacy Policy
          </p>
        </section>
      </main>
    </div>
  )
}
