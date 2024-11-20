const SplashScreen = () => {
  return(
    <section className="h-screen w-screen flex justify-center lg:justify-end items-center lg:items-end overflow-hidden">
      <div className="flex w-9/12 lg:w-4/12 px-3 py-3 ">
        <h1 className="text-3xl lg:text-4xl text-justify text-highlight !leading-7 lg:!leading-8">
        Welcome to SPORTIFY! Your ultimate sports space finder. Explore and discover sports facilities
        near you with ease. Whether you're looking for a place to play basketball, soccer, or any other sport, 
        SPORTIFY makes it simple and quick to find the perfect spot. ©2024
        Let’s get started and find your next game!
        </h1>
      </div>
    </section>
  )
}

export default SplashScreen;