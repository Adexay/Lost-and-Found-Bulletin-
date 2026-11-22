import { apiRequest } from '../services/api'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Camera, Check, ImagePlus } from 'lucide-react'

const categories = [
  { label: 'Electronics', value: 'electronics', icon: '💻' },
  { label: 'Bags', value: 'bags', icon: '🎒' },
  { label: 'Documents', value: 'documents', icon: '🪪' },
  { label: 'Clothing', value: 'clothing', icon: '🧥' },
  { label: 'Keys', value: 'keys', icon: '🔑' },
  { label: 'Other', value: 'other', icon: '📦' },
  { label: 'Accessories', value: 'accessories', icon: '👜' },
  { label: 'Personal Belongings', value: 'personal_belongings', icon: '🎒' },
  { label: 'Academics', value: 'academics', icon: '📚' },
]
const today = new Date()
const todayText = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0'),
].join('-')

const initialForm = {
  itemName: '',
  category: '',
  location: '',
  date: todayText,
  description: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
}

const stepLabels = [
  'Add a photo of the item',
  'What is the item?',
  'Which category fits best?',
  'Where did you find it?',
  'When did you find it?',
  'Describe it',
  'How can we reach you?',
]

export default function ReportFoundItemPage() {
  const [form, setForm] = useState(initialForm)
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const previewUrl = useRef('')

  useEffect(() => () => {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG, etc).')
      event.target.value = ''
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('That photo is too big. Please choose one under 10 MB.')
      event.target.value = ''
      return
    }

    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current)
    previewUrl.current = URL.createObjectURL(file)
    setPhoto(file)
    setPhotoPreview(previewUrl.current)
    setError('')
  }

  const handleNext = async (event) => {
    event.preventDefault()

    if (step === 0 && !photo) {
      setError('Please add a photo of the item.')
      return
    }
    if (step === 1 && !form.itemName.trim()) {
      setError('Please enter the name of the item.')
      return
    }
    if (step === 2 && !form.category) {
      setError('Please pick a category.')
      return
    }
    if (step === 3 && !form.location.trim()) {
      setError('Please say where you found the item.')
      return
    }
    if (step === 4 && !form.date) {
      setError('Please choose the date you found it.')
      return
    }
    if (step === 5 && !form.description.trim()) {
      setError('Please add a short description.')
      return
    }
    if (step === 6 && !form.contactName.trim()) {
      setError('Please enter your name.')
      return
    }

    if (step === 6 && !form.contactPhone.trim()) {
      setError('Please enter your phone number.')
      return
    }

    if (step === 6 && form.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
      setError('Please enter a valid contact email address.')
      return
    }

    setError('')
    if (step === stepLabels.length - 1) {
      const data = new FormData()
      data.append('title', form.itemName)
      data.append('category', form.category)
      data.append('location', form.location)
      data.append('date_found', form.date)
      data.append('description', form.description)
      data.append('image', photo)
      data.append('contact_name', form.contactName)
      data.append('contact_phone', form.contactPhone)
      if (form.contactEmail) {
        data.append('contact_email', form.contactEmail)
      }
      try {
        await apiRequest('/items/', {
        method: 'POST',
        body: data,
      })

      setSubmitted(true)
      }
      catch (error) {
        console.error('Error reporting item:', error)
        setError('Something went wrong. Please try again.')
      }
    }
    else {
      setStep((current) => current + 1)
    }
  }

  const handleBack = () => {
    setError('')
    setStep((current) => Math.max(0, current - 1))
  }

  const selectCategory = (category) => {
    setForm((current) => ({ ...current, category }))
    setError('')
    setStep(3)
  }

  return (
    <section className="report-wizard" aria-label="Report a found item">
      <div className="wizard-topline">
        <Link to="/" className="inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <Link to="/found-items">View found items</Link>
      </div>

      <div className="wizard-progress" aria-label={`Step ${submitted ? 7 : step + 1} of 7`}>
        <div
          className="wizard-progress-fill"
          style={{ width: `${submitted ? 100 : ((step + 1) / stepLabels.length) * 100}%` }}
        />
      </div>
      <p className="wizard-step-label" aria-live="polite">
        {submitted ? 'Done!' : `Step ${step + 1} of ${stepLabels.length}`}
      </p>

      {submitted ? (
        <div className="wizard-success" role="status">
          <div className="wizard-success-icon"><Check size={42} /></div>
          <h1 className="wizard-question">Item reported!</h1>
          <p>Thank you for helping a fellow student. Your item details are ready for review.</p>
          <Link to="/found-items" className="home-action">
            View found items
            <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleNext} noValidate>
          <div className="wizard-step">
            {step === 0 ? (
              <>
                <h1 className="wizard-question">📸 Add a photo of the item</h1>
                <p className="wizard-hint">Start with a clear picture so the owner can recognise it.</p>
                <label htmlFor="item-photo" className="photo-upload">
                  <ImagePlus className="photo-upload-icon" size={48} aria-hidden="true" />
                  <span>{photo ? 'Tap to change the photo' : 'Tap to choose a photo'}</span>
                </label>
                <input
                  className="photo-input"
                  id="item-photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  aria-label="Choose a photo of the item"
                />
                {photoPreview ? (
                  <img className="photo-preview" src={photoPreview} alt={`Preview of ${photo?.name || 'the found item'}`} />
                ) : null}
              </>
            ) : null}

            {step === 1 ? (
              <>
                <h1 className="wizard-question">🏷️ What is the item?</h1>
                <p className="wizard-hint">Give it a short name, like “Blue umbrella”.</p>
                <label className="sr-only" htmlFor="item-name">Item name</label>
                <input
                  className="wizard-input"
                  id="item-name"
                  name="itemName"
                  value={form.itemName}
                  onChange={handleChange}
                  maxLength={60}
                  placeholder="Item name"
                  autoFocus
                />
              </>
            ) : null}

            {step === 2 ? (
              <>
                <h1 className="wizard-question">🗂️ Which category fits best?</h1>
                <p className="wizard-hint">Tap one to continue.</p>
                <div className="category-option-grid">
                  {categories.map((category) => (
                    <button
                      className={`category-option${form.category === category.value ? ' selected' : ''}`}
                      type="button"
                      aria-pressed={form.category === category.value}
                      onClick={() => selectCategory(category.value)}
                    >
                      <span aria-hidden="true">{category.icon}</span>
                      {category.label}
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <h1 className="wizard-question">📍 Where did you find it?</h1>
                <p className="wizard-hint">Be as specific as you can.</p>
                <label className="sr-only" htmlFor="item-location">Location found</label>
                <input
                  className="wizard-input"
                  id="item-location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  maxLength={80}
                  placeholder="e.g. Library, second floor"
                  autoFocus
                />
              </>
            ) : null}

            {step === 4 ? (
              <>
                <h1 className="wizard-question">📅 When did you find it?</h1>
                <p className="wizard-hint">We picked today for you. Change it if needed.</p>
                <label className="sr-only" htmlFor="item-date">Date found</label>
                <input
                  className="wizard-input"
                  id="item-date"
                  name="date"
                  type="date"
                  value={form.date}
                  max={todayText}
                  onChange={handleChange}
                  autoFocus
                />
              </>
            ) : null}

            {step === 5 ? (
              <>
                <h1 className="wizard-question">📝 Describe it</h1>
                <p className="wizard-hint">Colour, size, brand, anything that makes it easy to recognise.</p>
                <label className="sr-only" htmlFor="item-description">Description</label>
                <textarea
                  className="wizard-input"
                  id="item-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  maxLength={200}
                  placeholder="Description"
                  autoFocus
                />
              </>
            ) : null}

            {step === 6 ? (
              <>
                <h1 className="wizard-question">✉️ How can we reach you?</h1>
                <p className="wizard-hint">Your name and phone number are required. Email is optional.</p>
                <label className="mb-4 block">
                  <span className="mb-2 block text-sm font-semibold">Contact name</span>
                  <input
                    className="wizard-input"
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    maxLength={80}
                    placeholder="Your name"
                    autoFocus
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Contact email</span>
                  <input
                    className="wizard-input"
                    name="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={handleChange}
                    placeholder="you@university.edu"
                  />
                </label>
                <label className="block mt-4">
                  <span className="mb-2 block text-sm font-semibold">Contact phone</span>
                  <input
                  className="wizard-input"
                  name="contactPhone"
                  type="tel"
                  value={form.contactPhone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                    />
                </label>
              </>
            ) : null}
          </div>

          {error ? <p className="wizard-error" role="alert">{error}</p> : null}

          <div className="wizard-actions">
            {step > 0 ? (
              <button className="wizard-back" type="button" onClick={handleBack}>
                <ArrowLeft size={16} />
                Back
              </button>
            ) : null}
            <button className="wizard-next" type="submit">
              {step === stepLabels.length - 1 ? (
                <>
                  <Camera size={17} />
                  Report found item
                </>
              ) : (
                <>
                  Next
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
