import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'

import { localedDate, endDate } from '../src/lib/dates'
import { SubmitData, TypeSelect } from '../src/types'
import { typeOptions } from '../src/lib/constants'

const Booking: NextPage = () => {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const startDateRef = useRef<HTMLInputElement>(null)
  const endDateRef = useRef<HTMLInputElement>(null)
  const requestRef = useRef<HTMLTextAreaElement>(null)

  const [typeSelection, setTypeSelection] = useState<TypeSelect>()
  const [dateSelection, setDateSelection] = useState<string>('')

  useEffect(() => {
    if (startDateRef?.current) {
      startDateRef.current.value = localedDate()
      setDateSelection(localedDate())
    }
  }, [])

  useEffect(() => {
    if (endDateRef?.current) {
      endDateRef.current.value = endDate(typeSelection, dateSelection)
    }
  }, [typeSelection, dateSelection])

  const submitBookingHandler = async (e: SyntheticEvent) => {
    e.preventDefault()

    const data: SubmitData = {
      name: nameInputRef.current?.value || '',
      email: emailInputRef.current?.value || '',
      type: typeSelection || '',
      start: dateSelection,
      end: endDateRef.current?.value || '',
      requests: requestRef.current?.value || '',
    }

    try {
      await fetch('/api/block', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (e) {
      //
    }
  }

  const typeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setTypeSelection(value as TypeSelect)
  }

  const dateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setDateSelection(value)
  }

  return (
    <form action="#" onSubmit={submitBookingHandler}>
      <fieldset>
        <label htmlFor="name">Name:</label>
        <input ref={nameInputRef} id="name" type="text" required />
      </fieldset>
      <fieldset>
        <label htmlFor="email">Email:</label>
        <input ref={emailInputRef} id="email" type="email" required />
      </fieldset>
      <fieldset>
        <label htmlFor="type">Type</label>
        <select name="type" id="type" onChange={typeHandler} required>
          {typeOptions.map((t, idx) => (
            <option key={idx} value={t.type}>
              {t.label}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="date">Start date:</label>
        <input
          ref={startDateRef}
          id="date"
          type="date"
          onChange={dateHandler}
          min={localedDate()}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="request">Requests:</label>
        <textarea id="request" ref={requestRef} cols={30} rows={10}></textarea>
      </fieldset>

      {/* Hidden input */}
      <input ref={endDateRef} type="date" />

      <button type="submit">Submit</button>
    </form>
  )
}

export default Booking
