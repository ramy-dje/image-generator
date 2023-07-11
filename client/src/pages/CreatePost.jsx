import React,{useState} from 'react';
import {json, useNavigate} from 'react-router-dom';
import {preview} from '../assets';
import {getRandomPrompt} from '../utils'
import {FormField,Loader} from '../Components'

const CreatePost = () => {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    name : '',
    prompt : '',
    photo : ''
  });
  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e){
    e.preventDefault();
    if(form.prompt && form.photo){
      setLoading(true);
      try{
        const response =await fetch('http://localhost:3000/api/v1/post',{method:'POST',
        headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
        await response.json();
        navigate('/');
      }catch(err){
        alert(err);
      }finally{
        setLoading(false);
      }
    }else{
      alert('enter a prompt please');
    }
  }
  function handleChange(e){
    setForm({...form,[e.target.name] : e.target.value});
  }
  function handleSurpriseMe(){
    console.log(form)
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form,prompt:randomPrompt});
  }
  async function generateImg(){
    if(form.prompt){
      try{
        setgeneratingImg(true);
        const response = await fetch('http://localhost:3000/api/v1/dalle',
        {method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({prompt:form.prompt})});
        const data = await response.json();
        setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`});
      }catch(e){
        console.log(e);
      }finally{
        setgeneratingImg(false);
      }
    }else{
      alert('enter a prompt');
    }

   
  }
  return (
    <section className='max-w-7xl mx-auto '>
       <div >
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create </h1>
        <p className='mt-2 text-[#666e75] text-[1px] max-w-[500px]'>
          create  imaginative and visualy stunning images through DALL-E AI and share them with the community
        </p>
      </div>
      <form className='mt-16 max-w-3xl ' onSubmit={handleSubmit}> 
        <div className='flex flex-col gap-5'>
          <FormField 
          labelName = 'your name'
          type = 'text'
          name = 'name'
          placeHolder = 'joe hoe'
          value = {form.name}
          handleChange = {handleChange} />
          <FormField 
          labelName = 'prompt'
          type = 'text'
          name = 'prompt'
          placeHolder = 'type something '
          value = {form.prompt}
          handleChange = {handleChange} 
          isSurpriseMe
          handleSurpriseMe = {handleSurpriseMe}  
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ?(
              <img 
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ):(
              <img 
                src={preview}
                alt='preview'
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}
            {generatingImg &&(
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]'>
                <Loader />
              </div>  
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5 '>
          <button
          type='button'
          onClick={generateImg}
          className='bg-green-700 text-white text-sm rounded-lg px-4 py-2 text-center w-full  font-medium '
          >{generatingImg ? 'Generating ' : 'Generate'}</button>
        </div>
        
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>

      </form>
    </section>
  )  
}

export default CreatePost