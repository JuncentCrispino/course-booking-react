import React from 'react'
import BreadCrumbs from '../components/BreadCrumbs'

export default function About() {
  return (
    <div className='max-w-screen-lg m-auto pt-[100px]'>
    <BreadCrumbs item={{path: '/about', name: 'About'}} className='ml-5 mb-3'/>
      <section className='p-6 max-w-s rounded-lg border border-gray-200 shadow-md bg-primary mx-4 mb-4'>
        <h1 className='mb-2 text-2xl font-semibold tracking-tight text-hb'>About Us</h1>
        <p className='text-md text-hb'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus efficitur vel massa vel efficitur. Ut et nisl eget urna tristique congue. Nam diam diam, tincidunt ut porttitor in, lacinia quis diam. Suspendisse nec lorem venenatis, ultrices lectus sit amet, ultrices elit. Mauris auctor, enim vel consequat vehicula, nibh elit pharetra ex, quis tempor eros eros vitae dolor. Sed blandit venenatis magna eu mattis. Integer pulvinar ut nibh ultricies sollicitudin. Fusce massa mi, tempor quis elit in, tempor viverra ligula. Cras nec lorem placerat enim ultricies dignissim. Donec ut ex nunc.
        <br />
        <br />
          Quisque scelerisque suscipit risus, eget condimentum augue dapibus sed. Cras vitae sagittis metus. Cras vel neque gravida, suscipit est eget, iaculis lectus. Praesent lobortis, nisi ac sagittis lobortis, mauris lorem iaculis ligula, vitae placerat dui leo at sapien. Pellentesque ac vehicula ipsum. Sed quis sagittis ipsum. Aenean scelerisque mattis lacus, sit amet egestas quam finibus at.
        <br />
        <br />
          Nullam posuere, diam at blandit congue, erat magna accumsan libero, id condimentum erat tellus at sapien. Quisque nisl velit, feugiat eu libero eu, accumsan gravida libero. Mauris in dictum tellus, at condimentum ipsum. Fusce turpis arcu, ornare at magna ac, mattis blandit neque. Ut fermentum, enim sit amet molestie consequat, nisl felis viverra ante, et commodo enim diam nec velit. Maecenas cursus tortor augue, sit amet scelerisque lectus aliquam sit amet. In accumsan nisl ligula, commodo dapibus libero placerat vitae. Nunc congue, justo ac ultricies blandit, nisl lectus luctus leo, vitae egestas odio dolor non magna. Ut non purus congue, molestie turpis vitae, scelerisque risus. Donec et metus vel tortor feugiat consequat quis sed nunc. Nam varius orci mi, at consectetur urna venenatis non. Donec vel quam felis. Donec suscipit ex vel libero aliquet ornare. Vivamus finibus dui vitae dignissim bibendum.
        <br />
        <br />
          Pellentesque sagittis egestas ornare. Praesent luctus lorem quam, non convallis diam egestas sed. Morbi laoreet odio id ultrices ornare. Proin mattis convallis sem, vel hendrerit ligula tempus egestas. Suspendisse lorem nulla, scelerisque imperdiet commodo eget, ornare at ligula. Sed vel massa viverra, pulvinar erat sit amet, tristique libero. Donec et elit luctus, mattis augue sit amet, feugiat nisl. Donec vel libero quis lorem faucibus pharetra. Morbi vitae elit nec ligula mollis elementum. Integer vel nisl blandit, imperdiet mi sit amet, tempor nibh. Vivamus ornare pharetra urna sit amet laoreet. Pellentesque ac sapien vitae purus porttitor iaculis. Etiam cursus ex quis arcu porttitor, in condimentum quam interdum.
        <br />
        <br />
        </p>
      </section>

    </div>
  )
}
