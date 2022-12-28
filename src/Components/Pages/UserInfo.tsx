import React,{useState} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import '../../Styles/UserInfo.css'

export const UserInfo = ({userfields, updateUser, userIsActive}:any):JSX.Element => {

    const navigate = useNavigate();
    console.log(userIsActive)
    if(userIsActive){
        let [validatedUser, setValidatedUser] = useState<any>({...userfields});
        let [userInfo, setUserInfo] = useState<any>({...userfields});
        let [userError, setUserError] = useState<any>({
            email:"",
            username:"",
            phone:""
        })

        const handleOnSubmit = (event:any) => {
            event.preventDefault()
            let validationFlag=true
            for(let error of Object.values(userError)){
                
                validationFlag = error===""?true&&validationFlag:false&&validationFlag
                console.log(validationFlag)
            }
            if(validationFlag){
                updateUser(validatedUser, userfields.id)
                navigate('/checkout')
            }
            
        }

        const handleChange = (event:any) => {
            let target= event.target
            let value = target.value
            let name = target.name
            let newField:any = {address:{...validatedUser.address},name:{...validatedUser.name}}
            let newError:any= {}


            if(name==="city"||name==="street"||name==="zipcode"){
                newField.address={...validatedUser.address}
                newField.address[name] = value
            }
            else if(name==="firstname"||name==="lastname"){
                newField.name={...validatedUser.name}
                newField.name[name] = value
                
            }
            else if(name==="number"){
                newField.address[name] = parseInt(value)
            }
            else{
                newField[name] = value
            }
            setUserInfo({...userInfo, ...newField})

            if(name==="email"){
                if(value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
                {
                    setValidatedUser({...validatedUser, ...newField})
                    newError[name] = ""
                    setUserError({...userError, ...newError})
                }
                else{
                    newError[name] = "Please ingress a valid email"
                    setUserError({...userError, ...newError})
                }
            }
            else if(name==="phone"){
                if(value.length>10){
                    setValidatedUser({...validatedUser, ...newField})
                    newError[name] = ""
                    setUserError({...userError, ...newError})
                }
                else{
                    newError[name] = "Please ingress a valid phone number"
                    setUserError({...userError, ...newError})
                }
            }
            else if(name==="username"){
                if(value.length>4){
                    setValidatedUser({...validatedUser, ...newField})
                    newError[name] = ""
                    setUserError({...userError, ...newError})
                }
                else{
                    newError[name] = "Your user name must contain more than 4 characters"
                    setUserError({...userError, ...newError})
                }
            }
            else{
                
                setValidatedUser({...validatedUser, ...newField})
                console.log(validatedUser)
            }

            event.preventDefault()

        }

        const formName = Object.entries(userfields.name).map(([trait,value]:any, index:number)=>{

            console.log(userInfo.name[trait])
            return(<>
            <span key={`${trait} ${index}`}>
                <div className="input__div2">
                    <label className="label__active2 form__label2" htmlFor="input"> {String(trait)}: </label>
                    <input className="form__input2" id="input" name={String(trait)} value={userInfo.name[trait]}
                    onChange={(event)=>handleChange(event)} required/>
                </div>
            </span>
            </>)
        })

        const formAddress = 
            (<>
            <span>
                <div className="input__div2">
                    <label className="label__active2 form__label2">City:</label>
                    <input className="form__input2" id="input" name="city" value={userInfo.address.city}
                    onChange={(event)=>handleChange(event)} required/>
                </div>
                <div className="input__div2">
                    <label className="label__active2 form__label2" htmlFor="input">Street: </label>
                    <input className="form__input2" id="input" name="street" value={userInfo.address.street}
                    onChange={(event)=>handleChange(event)} required/> 
                </div>
                <div className="input__div2">   
                    <label className="label__active2 form__label2" htmlFor="input">Number: 
                    </label>
                    <input type="number" className="form__input2" id="input" name="number" value={userInfo.address.number}
                    onChange={(event)=>handleChange(event)} required/> 
                </div>
                <div className="input__div2">
                    <label className="label__active2 form__label2" htmlFor="input">Zip-Code:</label>
                    <input className="form__input2" id="input" name="zipcode" value={userInfo.address.zipcode}
                    onChange={(event)=>handleChange(event)} required/>
                </div>
            </span>
            </>)

        const formvalues = Object.entries(userfields).map(([trait,value]:any, index:number)=>{
            if(String(trait)!=="address"&&String(trait)!=="name"&&String(trait)!=="id"&&String(trait)!=="password"&&String(trait)!=="__v"){
                console.log(userInfo[trait])
                return(<>
                <span key={`${trait} ${index}`}>
                    <div className="input__div2">
                        <label className="label__active2 form__label2" htmlFor="input"> {String(trait)}: </label>
                        <input className="form__input2" id="input" name={String(trait)} value={userInfo[trait]} 
                                    onChange={(event)=>handleChange(event)} required/>
                    </div>
                    <div className="Err__mess2">
                        {userError[trait]!==""?<><label>{userError[trait]}</label><br/></>:<></>}
                    </div>
                </span>
                </>)
            }
        })
        return(<>
        
            <form>
            <span className='row'>
                <span className='col-md-6'>
                    <div className="info___title">
                        <h3 className='usertl__chk'>User Info:</h3>
                    </div>
                    <hr/>
                    {formvalues}
                    {formName}
                    <br/>
                </span>
                <span className='col-md-6'>
                    <>
                    <div className="info___title">
                    <h3 className='usertl__chk'>Delivery Info:</h3>
                    </div>
                    <hr/>
                    {formAddress} 
                    <div className="buttoninfo__container">
                        <button className='btn btn-dark' type="submit" onClick={(event)=>handleOnSubmit(event)}>SAVE INFO</button>
                    </div>
                    
                    </>
                </span>
            </span>
            
            <br/><br/>
            </form>
            
        
            
        </>)
    }
    else{
    navigate('/checkout')
      return(<>
      <div className='page__message'>
        <p>You're not logged please log in to check your information or <Link to='/home'>check our products and offers</Link></p>
      </div>
      </>)
        
    }

}