
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Modal, ModalHeader, ModalBody} from 'reactstrap';
import brandlogo from '../Assets/Images/Revery_AI_Logomark_-_Black.png';
import '../Styles/NavigationBar.css';


export const NavigationBar = ({state, emailValidation, setValidationState, passwordValidation, logout, postUser}:any):JSX.Element =>{


    let [isModalFormOpen, setIsModalOpen] = useState(false)
    let [userEmail, setUserEmail] = useState(state.user.email)
    let [userError, setUserError] = useState("")
    let [userPassword, setUserPassword] = useState("")
    let [verificationPassword, setVerificationPassword] = useState("")
    let [isModelLoading, setIsModelLoading] = useState(false)
    let [labelClass, setLabelClass] = useState("")
    let [collapsed, setCollapsed] = useState(true)


    const toggleMainModal = () => {
        setIsModalOpen(!isModalFormOpen)
        setIsModelLoading(true)
    }

    const handleInputChange = (event:any) =>{
        let target = event.target
        let name = target.name
        let value = target.value
        setUserError("")
        if(name==="email"){
            value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?
                setUserEmail(value):setUserError("Please ingress a valid email")
        }
        else if(name==="password_v" || name==="password_v2"){
            if(value.length<8 ){
                setUserError("Your password must contain more than 8 characters")
            }
            else if(userPassword !== value){
                setUserError("The passwords doesn't match")
            }
            else{
                setVerificationPassword(value)
            }
        }
    }

    const handleSubmit = (e:any) => {
        if(state.validationProcess==="not started"){
            emailValidation(userEmail)
        }
        else if (state.validationProcess==="found email"){
            passwordValidation({email:userEmail, password:userPassword})
        }
        else if (state.validationProcess==="email not found"){
            if(verificationPassword!==""){
                postUser({email:userEmail, password:verificationPassword})
            }
        }
        else if (state.validationProcess==="validated user"){
            toggleMainModal()
            setValidationState("finished")
        }
        else if(state.validationProcess==="finished"){
            logout()
            toggleMainModal()
        }
        e.preventDefault()
    }

    return (
        <>
            <Navbar dark={false}>
            <NavbarBrand href="/">      
            <img className='logo__nav' alt="logo" src={brandlogo} />
            <p className='brand__nav'>RVY Store</p>
            </NavbarBrand>       

            <div className='nav__medium'>
                <Nav >
                    <NavItem >
                    <NavLink className='nav__item' href="/home">
                        <div className='navlink'>Home</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/men">
                        <div className='navlink'>Men</div>
                        
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/women">
                        <div className='navlink'>Women</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/accessories">
                        <div className='navlink'>Accessories</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/electronics">
                        <div className='navlink'>Electronics</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                </Nav>
            </div>
            
            <NavbarText>
                {
                state.active?
                    <NavLink className="nav__sideicons" href="/favorites">
                        <i className="ri-heart-line"></i>
                    </NavLink>:
                    <span className="nav__sideicons" onClick={() => {toggleMainModal()}}>
                        <i className="ri-heart-line"></i>
                    </span>
                }
                {
                state.active?
                    <NavLink className="nav__sideicons" href="/checkout">
                        <i className="ri-shopping-cart-line"></i>
                    </NavLink>:
                    <span className="nav__sideicons" onClick={() => {toggleMainModal()}}>
                        <i className="ri-shopping-cart-line"></i>
                    </span>
                }
                <span className="nav__sideicons" onClick={() => {toggleMainModal()
                                                                 setLabelClass("")}}>
                                                                    <i className="ri-user-fill"></i></span>
            </NavbarText>
            
            <NavbarToggler onClick={()=>setCollapsed(!collapsed)} className="nav__small" />
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                    <NavItem >
                    <NavLink className='nav__item' href="/home">
                        <div className='navlink'>Home</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/men">
                        <div className='navlink'>Men</div>
                        
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/women">
                        <div className='navlink'>Women</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/accessories">
                        <div className='navlink'>Accessories</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/electronics">
                        <div className='navlink'>Electronics</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                </Nav>
            </Collapse>

            </Navbar>
            
            <div>
                <Modal isOpen={isModalFormOpen} toggle={toggleMainModal}>
                    <ModalHeader className="modal__header" toggle={toggleMainModal}>Log In / Sign Up</ModalHeader>
                    <ModalBody>
                        <div className="icon__container">
                            <i className="login__icon ri-shield-user-fill"></i>
                            
                        </div>
                        
                        <form name="myform" onSubmit={e => {handleSubmit(e)}}>
                            <div className='form__content'>
                            {
                                
                                state.validationProcess==="not started"?
                                <>
                                
                                    <p>Login to pick your products and enjoy our amazing promotions!</p>
                                    <div className="input__div" onClick={() => {setLabelClass("label__active")}}>
                                        
                                        <label className={`${labelClass} form__label`} 
                                                htmlFor="input"
                                                onClick={() => {
                                                    setLabelClass("label__active")}}>
                                                        Email
                                        </label>
                                        <input id="input" className="form__input" type="email" name="email" 
                                        onChange={(event) => handleInputChange(event)} required/><br/>
                                    </div>
                                    <div className="Err__mess">{userError!==""?<label>{userError}</label>:<></>}</div>
                                    <input className="form__button" type="submit" value="Continue" /> 
                                </>:<></>
                            }
                            {
                                state.validationProcess==="found email"?
                                <>

                                <p> Your email is registered, write your password</p><br/>
                                <div className="input__div" onClick={() => {setLabelClass("label__active")}}>
                                <label className={`${labelClass} form__label`} 
                                                htmlFor="input"
                                                onClick={() => {
                                                    setLabelClass("label__active")}}>
                                                Password:</label>
                                <input id="input" className="form__input" type="password" onChange={event => setUserPassword(event.target.value)} required/><br/>
                                </div>
                                <div className="Err__mess">{state.errMess?<label> {state.errMess} </label>:<></>}</div>
                                <input className="form__button" type="submit" value="Log In" /> 
                                </>:<></>
                            }
                            {
                                state.validationProcess==="email not found"?
                                <>
                                    <p> Your email isn't registered, create a new password</p><br/>
                                    <div  className="input__div" onClick={() => {setLabelClass("label__active")}}>
                                        <label className={`${labelClass} form__label`} 
                                                htmlFor="input" onClick={() => {setLabelClass("label__active")}}>
                                                    Password:
                                        </label>
                                        <input className="form__input" id="input" type="password" name="password_v" onChange={(event) => {
                                                                            setUserPassword(event.target.value)
                                                                            handleInputChange(event)}} required/><br/>
                                    </div>
                                    
                                    <div  className="input__div" onClick={() => {setLabelClass("label__active")}}>
                                        <label className={`${labelClass} form__label`} 
                                                    htmlFor="input2" onClick={() => {setLabelClass("label__active")}}>
                                                        Verificate Password:</label>
                                        <input className="form__input" id="input2" type="password" name="password_v2" onChange={(event) => handleInputChange(event)} required/><br/>
                                    </div>

                                    <div className="Err__mess">
                                        {userError!==""?<label>{userError}</label>:<></>}
                                        {state.errMess?<label> {state.errMess} </label>:<></>}
                                    </div>
                                    <input className="form__button" type="submit" value="Create Account" /> 
                                </>:<></>
                            }
                            {
                                state.validationProcess==="validated user"?
                                <>
                                    <p> Welcome {state.user.username}, your account is validated</p> <br/>
                                    <input className="form__button" type="submit" value="Start to Buy!" /> 
                                </>:<></>
                            }   
                            {
                                state.validationProcess==="finished"?
                                <>
                                    <label className="user__name"> {state.user.username}</label> <br/>
                                    <input className="form__button" type="submit" value="Log Out" />
                                </>:<></>
                            }       
                            </div>                     
                        </form> 
                    </ModalBody>
                </Modal>
            </div>

            
        </>
    )
}