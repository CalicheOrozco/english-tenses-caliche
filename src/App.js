import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";

function App() {
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState();
  const [title, setTitle] = useState("English Tenses by Caliche");

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      const valueCapitalize =
        inputValue[0].toUpperCase() + inputValue.substring(1).trim();
      const valueLower = inputValue.toLowerCase().trim();
      const result = data.filter((obj) => obj.verb === valueCapitalize);
      let serchVerb = result[0]?.verb;
      setTitle(serchVerb);
      setSearch(result);
      if (result.length === 0) {
        const result = data.filter((obj) => obj.past === valueLower);
        let serchVerb = result[0]?.verb;
        setTitle(serchVerb);
        setSearch(result);
        if (result.length === 0) {
          const result = data.filter(
            (obj) => obj.pastParticiple === valueLower
          );
          let serchVerb = result[0]?.verb;
          setTitle(serchVerb);
          setSearch(result);
          if (result.length === 0) {
            const result = data.filter(
              (obj) => obj.presentParticiple === valueLower
            );
            let serchVerb = result[0]?.verb;
            setTitle(serchVerb);
            setSearch(result);
            if (result.length === 0) {
              setErrorMsg("Sorry, no found results");
              setSearch(false);
            }
          }
        }
      }
    }
    if (inputValue === "") {
      setAnimate(true);
      setErrorMsg("Please enter a word");
      setSearch(false);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    setLoading(true);
    setInputValue("");
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // cleaning the input
    const input = document.querySelector("input");
    input.value = "";
  };

  const getData = useEffect(() => {
    fetch("/words.json")
      .then((res) => res.json())
      .then((res) => setData(res));
    //generateFrase();
  }, []);

  // if data is false, return loading
  if (!data) {
    return (
      <div className="loading w-full h-screen bg-slate-900 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <ImSpinner8 className="loading-icon text-5xl animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="w-full bg-slate-900 h-screen flex flex-col items-center justify-center lg:px-0">
        <div className="absolute w-full h-screen flex flex-col items-center justify-center px-4 lg:px-0">
          <h1 className="text-5xl text-white font-bold p-4">{title}</h1>
          {errorMsg && (
            <div className="text-white w-4/5 my-3 bg-[#ff208c] p-4 capitalize rounded-md">
              {errorMsg}
            </div>
          )}
          {/* Form */}
          <form
            className={`${
              animate ? "animate-shake" : "animate-none"
            } h-16 bg-slate-50 shadow-2xl  w-4/5
          rounded-full backdrop-blur-1xl mb-8`}
          >
            <div className=" h-full relative flex items-center justify-between p-2">
              <input
                onChange={(e) => handleSearch(e)}
                className="flex-1 bg-transparent outline-none placeholder:text-slate-900 text-slate-900 text-bold font-light pl-6 h-full"
                type="text"
                placeholder="Search by word..."
              />
              <button
                onClick={(e) => handleSubmit(e)}
                className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
              >
                <IoMdSearch className="text-2xl text-white" />
              </button>
            </div>
          </form>
          {/* Card */}
          {!search ? null : loading ? (
            <div className="loading w-full h-screen bg-slate-900 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
              <ImSpinner8 className="loading-icon text-5xl animate-spin text-white" />
            </div>
          ) : (
            <div className="w-4/5 px-2 overflow-y-scroll">
              lo
              <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-x-6">
                <div>
                  <h2 className="text-3xl font-bold text-white text-left">
                    {search[0]?.past}
                  </h2>
                  <span className="text-xl text-white text-left">{`past tense of ${search[0]?.verb} is ${search[0]?.past}`}</span>
                </div>
                <div className="p-4 w-full lg:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">{`${search[0]?.verb} verb forms`}</h2>
                  <table class="table-auto d-none hidden md:block w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          Infinitive
                        </th>
                        <th className="p-4 text-black border-2 border-black">
                          Present Participle
                        </th>
                        <th className="p-4 text-black border-2 border-black">
                          Past Tense
                        </th>
                        <th className="p-4 text-black border-2 border-black">
                          Past Participle
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 text-black border-2 border-black">
                          {search[0]?.infinitive}
                        </td>
                        <td className="p-4 text-black border-2 border-black">
                          {search[0]?.presentParticiple}
                        </td>
                        <td className="p-4 text-black border-2 border-black">
                          {search[0]?.past}
                        </td>
                        <td className="p-4 text-black border-2 border-black">
                          {search[0]?.pastParticiple}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="md:hidden my-7">
                    <div className="flex flex-col">
                      <span className="text-black font-bold">Infinitive</span>
                      <span className="text-black">
                        {search[0]?.infinitive}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-black font-bold">
                        Present Participle
                      </span>
                      <span className="text-black">
                        {search[0]?.presentParticiple}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-black font-bold">Past Tense</span>
                      <span className="text-black">{search[0]?.past}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-black font-bold">
                        Past Participle
                      </span>
                      <span className="text-black">
                        {search[0]?.pastParticiple}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Simple / Indefinite Present Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationSimplePresent[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationSimplePresent[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationSimplePresent[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Present Continuous Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPresentContinuous[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPresentContinuous[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPresentContinuous[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Present Perfect Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPresentPerfect[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPresentPerfect[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPresentPerfect[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Present Perfect Continuous Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPresentPerfectContinuous[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPresentPerfectContinuous[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPresentPerfectContinuous[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Simple Past Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationSimplePast[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationSimplePast[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationSimplePast[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Past Continuous Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPastContinuous[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPastContinuous[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPastContinuous[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Past Perfect Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPastPerfect[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPastPerfect[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPastPerfect[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Past Perfect Continuous Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPastPerfectContinuous[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPastPerfectContinuous[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationPastPerfectContinuous[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Simple Future Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFuture[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFuture[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFuture[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Future Continuous Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFutureContinuous[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFutureContinuous[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFutureContinuous[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Future Perfect Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFuturePerfect[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFuturePerfect[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFuturePerfect[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
                <div className="p-4 w-full md:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">
                    Future Perfect Continuous Tense
                  </h2>
                  <table class="table-auto w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFuturePerfectContinuous[0]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFuturePerfectContinuous[1]}
                        </th>
                      </tr>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          {search[0]?.conjugationFuturePerfectContinuous[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
