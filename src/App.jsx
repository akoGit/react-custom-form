import './App.css'
import { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import succ from './assets/noloop.gif'
import {
    CurrencyCircleDollar,
    UserCircle,
    EnvelopeSimple,
    Shapes,
    TextT,
    CaretDown,
    PaperPlaneTilt,
    // CheckCircle
} from "@phosphor-icons/react";


const DropDownListContainer = styled("div")`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  margin-top: .2rem;
  border-radius: 2px;
  transform-origin: top center;
  z-index: ${(props) => (props.isOpen ? 10 : -10)};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: scale(${(props) => (props.isOpen ? 1 : 0.95)});
  transition: opacity 100ms ease-out, transform 100ms ease-out;
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
`

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
    }, )

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
                
                <div  className="relative w-full flex items-center">
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


            <div  className="relative w-full flex items-center">
                <div className='absolute ml-2 grid place-items-center'>
                   <EnvelopeSimple size={iconSize} color={iconColor}/>
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
                <div className="drop_down_header" tabIndex="0" onClick={toggling} >
                    <div className='absolute left-px ml-2 grid place-items-center'>
                        <CurrencyCircleDollar size={iconSize} color={iconColor} />
                    </div>
                    {budget || "Project Budget"}
                 <CaretDown size={20}  weight="bold" 
                        style={{
                            color: iconColor,
                            marginRight: "1rem",
                            transition: "transform .2s ease-out",
                            transform: `rotate(${caretRotation}deg)`,
                        }}
                    />
                                          
                </div>

                <DropDownListContainer isOpen={isOpen}>
                    <ul className='p-0 m-0 bg-gray-800 text-lg text-white text-left'>
                        {options.map((option) => (
                            <li className='list_style'
                                onClick={onOptionClicked(option)}
                                key={Math.random()}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </DropDownListContainer>
            </div>
            <div  className="relative w-full flex items-center">
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className='h-full fill-white'
                    >
                        <circle cx="4" cy="12" r="3" opacity="1">
                            <animate
                                id="spinner_qYjJ"
                                begin="0;spinner_t4KZ.end-0.25s"
                                attributeName="opacity"
                                dur="0.75s"
                                values="1;.2"
                                fill="freeze"
                            />
                        </circle>
                        <circle cx="12" cy="12" r="3" opacity=".4">
                            <animate
                                begin="spinner_qYjJ.begin+0.15s"
                                attributeName="opacity"
                                dur="0.75s"
                                values="1;.2"
                                fill="freeze"
                            />
                        </circle>
                        <circle cx="20" cy="12" r="3" opacity=".3">
                            <animate
                                id="spinner_t4KZ"
                                begin="spinner_qYjJ.begin+0.3s"
                                attributeName="opacity"
                                dur="0.75s"
                                values="1;.2"
                                fill="freeze"
                            />
                        </circle>
                    </svg>
                ) : submitted ? (
                    <div className='flex items-center justify-center'>

                    {/*<CheckCircle size={iconSize} color={iconColor} />*/}
                    <img src={succ} width="25px" height="25px" />
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
