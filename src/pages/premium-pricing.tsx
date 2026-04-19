import '../App.css'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import {
  premiumCourse,
  premiumPurchaseOptions,
  setStoredPremiumPurchaseOption,
} from '../lib/premiumCourse'

export default function PremiumPricing() {
  const navigate = useNavigate()
  const personalOptions = premiumPurchaseOptions.filter(option => option.category === 'Purchase for yourself')
  const businessOptions = premiumPurchaseOptions.filter(option => option.category === 'Purchase for your business')

  const chooseOption = (optionId: (typeof premiumPurchaseOptions)[number]['id']) => {
    setStoredPremiumPurchaseOption(optionId)
    navigate('/premium-course/payment')
  }

  return (
    <div className="premium-page-root premium-pricing-root">
      <AppHeader
        title="Choose Your Access"
        subtitle={premiumCourse.title}
        backLabel="Back to Course Overview"
        onBack={() => navigate('/premium-course')}
      />

      <main className="pricing-layout">
        <section className="pricing-hero-card">
          <div className="premium-pill">Choose a plan</div>
          <h1 className="pricing-title">Pick the option that best fits you or your organisation.</h1>
          <p className="pricing-copy">
            Start with an individual licence or choose a team package for business rollout. You&apos;ll review payment on
            the next screen once you&apos;ve made your selection.
          </p>
        </section>

        <section className="pricing-section">
          <div className="payment-plan-group-title">Purchase for yourself</div>
          <div className="pricing-single-grid">
            {personalOptions.map(option => (
              <button
                key={option.id}
                type="button"
                className="payment-plan-card pricing-plan-card"
                onClick={() => chooseOption(option.id)}
              >
                <div className="payment-plan-card-top">
                  <div>
                    <div className="payment-plan-name">{option.name}</div>
                    <div className="payment-plan-audience">{option.audience}</div>
                  </div>
                  <div className="payment-plan-price">GBP {option.price.toLocaleString()}</div>
                </div>
                <div className="payment-plan-copy">{option.summary}</div>
                <div className="payment-plan-price-label">{option.priceLabel}</div>
                <ul className="payment-plan-benefits">
                  {option.benefits.map(benefit => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <span className="pricing-continue-link">Continue to payment</span>
              </button>
            ))}
          </div>
        </section>

        <section className="pricing-section">
          <div className="payment-plan-group-title">Purchase for your business</div>
          <div className="payment-business-grid pricing-business-grid">
            {businessOptions.map(option => (
              <button
                key={option.id}
                type="button"
                className="payment-plan-card payment-plan-card-business pricing-plan-card"
                onClick={() => chooseOption(option.id)}
              >
                <div className="payment-plan-tier">{option.name}</div>
                <div className="payment-plan-price payment-plan-price-business">GBP {option.price.toLocaleString()}</div>
                <div className="payment-plan-audience">{option.audience}</div>
                <div className="payment-plan-copy">{option.summary}</div>
                <ul className="payment-plan-benefits">
                  {option.benefits.map(benefit => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <span className="pricing-continue-link">Choose {option.name}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
