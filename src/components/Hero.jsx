function Hero() {
  return (
    <div className="p-1">
      <div className="w-full my-3 flex flex-col flex-col-reverse md:flex-row sm:gap-4">
        <div>
          <h4 className="text-3xl font-bold text-slate-800">Por qué elegirnos</h4>
          <p className="text-slate-500 font-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6GYS6oVbcl8UkjlEf_NoVAHaE7%26pid%3DApi&f=1&ipt=10b26cb4e3f6f8f6ced89d8f6a3e5ea317f9dafce3f45a87afacc2e7f49c5cf7&ipo=images" />
        </div>
      </div>
      <div className="w-2/4 mt-2 rounded-sm text-white text-center p-2 bg-cyan-500 text-2xl capitalize">Ir A la tienda</div>
    </div>
    )
}

export default Hero;