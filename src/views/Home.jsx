import React from 'react'
import BreadCrumbs from '../components/BreadCrumbs'
export default function Home() {
  
  return (
    <div className='max-w-screen-lg m-auto pt-[100px]'>
    <BreadCrumbs className='ml-5 mb-3'/>
      <section className='p-6 max-w-s rounded-lg border border-gray-200 shadow-md bg-primary mx-4 mb-4'>
        <h1 className='mb-2 text-2xl font-semibold tracking-tight text-hb'>Welcome to UpBook</h1>
        <p className='text-md text-hb'>
        Nullam posuere, diam at blandit congue, erat magna accumsan libero, id condimentum erat tellus at sapien. Quisque nisl velit, feugiat eu libero eu, accumsan gravida libero. Mauris in dictum tellus, at condimentum ipsum. Fusce turpis arcu, ornare at magna ac, mattis blandit neque. Ut fermentum, enim sit amet molestie consequat, nisl felis viverra ante, et commodo enim diam nec velit. Maecenas cursus tortor augue, sit amet scelerisque lectus aliquam sit amet. In accumsan nisl ligula, commodo dapibus libero placerat vitae. Nunc congue, justo ac ultricies blandit, nisl lectus luctus leo, vitae egestas odio dolor non magna. Ut non purus congue, molestie turpis vitae, scelerisque risus. Donec et metus vel tortor feugiat consequat quis sed nunc. Nam varius orci mi, at consectetur urna venenatis non. Donec vel quam felis. Donec suscipit ex vel libero aliquet ornare. Vivamus finibus dui vitae dignissim bibendum.
        </p>
      </section>
      <section className='grid lg:grid-cols-3'>
        <div className='p-6 max-w-s rounded-lg border border-gray-200 shadow-md bg-primary mx-4 mb-4 col-span-1'>
        <h1 className='mb-2 text-xl font-semibold tracking-tight text-hb'>Mission</h1>
        <p className='text-md text-hb'>
        Pellentesque sagittis egestas ornare. Praesent luctus lorem quam, non convallis diam egestas sed. Morbi laoreet odio id ultrices ornare. Proin mattis convallis sem, vel hendrerit ligula tempus egestas. Suspendisse lorem nulla, scelerisque imperdiet commodo eget, ornare at ligula. Sed vel massa viverra, pulvinar erat sit amet, tristique libero. Donec et elit luctus, mattis augue sit amet, feugiat nisl. Donec vel libero quis lorem faucibus pharetra.
        </p>
        </div>
        <div className='p-6 max-w-s rounded-lg border border-gray-200 shadow-md bg-primary mx-4 mb-4 col-span-1'>
        <h1 className='mb-2 text-xl font-semibold tracking-tight text-hb'>Vision</h1>
        <p className='text-md text-hb'>
        Nulla non molestie sapien. Vivamus tincidunt libero id risus vulputate, eget pulvinar ex scelerisque. Proin euismod sem elit, ac varius mauris eleifend quis. Donec consectetur tempor ligula ut porttitor. Nam sagittis risus posuere, imperdiet velit nec, scelerisque urna. Nam consectetur dolor sit amet quam lobortis, vitae rhoncus nibh bibendum. Donec in vehicula urna. Donec in venenatis libero. Mauris tempus ex vel viverra auctor.
        </p>
        </div>
        <div className='p-6 max-w-s rounded-lg border border-gray-200 shadow-md bg-primary mx-4 mb-4 col-span-1'>
        <h1 className='mb-2 text-xl font-semibold tracking-tight text-hb'>Philosophy</h1>
        <p className='text-md text-hb'>
        Quisque scelerisque suscipit risus, eget condimentum augue dapibus sed. Cras vitae sagittis metus. Cras vel neque gravida, suscipit est eget, iaculis lectus. Praesent lobortis, nisi ac sagittis lobortis, mauris lorem iaculis ligula, vitae placerat dui leo at sapien. Pellentesque ac vehicula ipsum. Sed quis sagittis ipsum. Aenean scelerisque mattis lacus, sit amet egestas quam finibus at. Donec vel quam felis. Donec suscipit ex vel libero aliquet ornare. Vivamus finibus dui vitae dignissim bibendum.
        </p>
        </div>
        
      </section>
    </div>
  )
}
