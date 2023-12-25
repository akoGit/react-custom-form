import './App.css'
import { useState, useRef, useEffect } from "react"
// import succ from './assets/noloop.gif'
import {
    CurrencyCircleDollar,
    UserCircle,
    EnvelopeSimple,
    Shapes,
    TextT,
    CaretDown,
    PaperPlaneTilt,
    CheckCircle
} from "@phosphor-icons/react";

const options = ["Less than 10K", "10k-20k", "20k-30k", "30k-40k", "50k+"]
const iconSize = 26
const iconColor = '#ffffff'

function Formv1() {
    const [isOpen, setIsOpen] = useState(false)
    const [budget, setSelectedOption] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [caretRotation, setCaretRotation] = useState(0)
    const [loading, setLoading] = useState(false)

    const dropdownRef = useRef(null)

    const toggling = () => {
        setIsOpen(!isOpen)
        setCaretRotation(caretRotation === 0 ? 180 : 0)
    }
    const onOptionClicked = (value) => () => {
        setSelectedOption(value)
        setIsOpen(false)
    }
    const handleClick = (event) => {
        if (loading || submitted) {
            event.preventDefault()
        }
    }

    const handleOutsideClick = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false)
            setCaretRotation(caretRotation === 180 ? 0 : 0)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick)
        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    },)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 2000);
    };

    const handleHover = () => {
        if (!loading && !submitted) {
            setHovered(true)
        }
    }

    const handleLeave = () => {
        setHovered(false)
    }

    const [hovered, setHovered] = useState(false)

    return (
        <form
            className='flex flex-col text-lg gap-4 bg-transparent rounded relative w-full text-white'
            method="POST"
            onSubmit={handleSubmit}
        >
            <div className='flex items-center gap-4'>
                <div className="relative w-full flex items-center">
                    <div className='absolute ml-2 grid place-items-center'>
                        <UserCircle size={iconSize} color={iconColor} />
                    </div>
                    <input
                        type="text"
                        id="firstname"
                        name="name"
                        placeholder="First name *"
                        required
                    />
                </div>

                <div className="relative w-full flex items-center">
                    <div className='absolute ml-2 grid place-items-center'>
                        <UserCircle size={iconSize} color={iconColor} />
                    </div>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name *"
                        required
                    />
                </div>
            </div>


            <div className="relative w-full flex items-center">
                <div className='absolute ml-2 grid place-items-center'>
                    <EnvelopeSimple size={iconSize} color={iconColor} />
                </div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email *"
                    required
                />
            </div>

            <div className="relative w-full flex items-center">
                <div className='absolute ml-2 grid place-items-center'>
                    <Shapes size={iconSize} color={iconColor} />
                </div>
                <input
                    type="text"
                    id="industry"
                    name="industry"
                    placeholder="Service you're interested in"
                    required
                />
            </div>

            <div className="relative bg-transparent" ref={dropdownRef}>

                <div className="text-lg text-gray-400 h-16 rounded-sm pl-11 relative cursor-pointer flex bg-gray-700 justify-between items-center whitespace-no-wrap outline-none focus:outline-white outline-offset-0" 
                    tabIndex="0" onClick={toggling} >
                    <div className='absolute left-px ml-2 grid place-items-center'>
                        <CurrencyCircleDollar size={iconSize} color={iconColor} />
                    </div>
                    {budget || "Project Budget"}
                    <CaretDown size={20} weight="bold" color={iconColor}
                        className={`rotate-${caretRotation} transition-transform duration-200 mr-4`}
                    />
                </div>

                <div className={`opacity-${isOpen ? '100' : '0'} z-${isOpen ? '10' : '0'}
                    scale-${isOpen ? '100' : '75'} pointer-events-${isOpen ? 'auto' : 'none'} transition-all 
                    absolute top-full left-0 w-full overflow-hidden mt-1 rounded-sm origin-top`}>

                    <ul className='p-0 m-0 bg-gray-800 text-lg text-white text-left'>
                        {options.map((option) => (
                            <li className='list-none py-5 px-4 border-2 rounded-sm border-transparent transition-colors hover:bg-gray-900 hover:cursor-pointer'
                                onClick={onOptionClicked(option)}
                                key={Math.random()}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="relative w-full flex items-center">
                <div className='absolute top-4 left-2.5'>
                    <TextT size={iconSize} color={iconColor} />
                </div>
                <textarea
                    type="textarea"
                    rows="3"
                    id="message"
                    name="message"
                    placeholder="Additional information..."
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                onClick={handleClick || submitted}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                className="submit_button"
                style={{
                    backgroundColor: hovered
                        ? "#374151"
                        : submitted
                            ? "#040921"
                            : "#040921",
                }}
            >
                {loading ? (
                        <l-waveform
                          size="18"
                          speed="1"
                          stroke="2"
                          color={iconColor}
                          className='h-full fill-white'
                        ></l-waveform>
                ) : submitted ? (
                    <div className='flex items-center justify-center'>

                        <CheckCircle size={iconSize} color="#0e9f6e" />
                        {/*lottie animation converted to gif */}
                        {/*<img src={succ} width="25px" height="25px" />*/}
                        <span className='ml-1'>
                            Thank you, Your request was sent.
                        </span>
                    </div>
                ) : (
                    <div className='flex items-center justify-center'>
                        <PaperPlaneTilt size={iconSize} color={iconColor} />
                        <span className='ml-2'>
                            Send a request
                        </span>
                    </div>
                )}
            </button>
        </form>
    )
}
export default Formv1
