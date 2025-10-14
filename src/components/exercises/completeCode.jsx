import { IoClose } from "react-icons/io5";
import trophy from "../../assets/trophy.svg";

function QuestionButton({ text, question, onClick }) {
  return (
    <button
      className="[2px]border flex h-12 w-56 cursor-pointer items-center justify-center rounded-[10px] border-2 border-[#525252] bg-[#3F3F46] p-3 text-white hover:opacity-70"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
function SubmitButton({ text, question, onClick }) {
  return (
    <button
      className="[2px]border flex h-12 w-56 cursor-pointer items-center justify-center rounded-[10px] border-2 border-[#525252] bg-[#25B700] p-3 text-white hover:opacity-70"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export function CompleteCode() {
  return (
    <div className="flex flex-col">
      <div className="m-auto flex max-w-4xl flex-1 flex-col space-y-16 py-9">
        {/* Barra */}
        <div className="flex w-full items-center justify-between gap-16">
          <IoClose className="text-6xl" />
          <div class="h-4 w-full rounded-full bg-zinc-600 dark:bg-gray-700">
            <div
              class="h-4 rounded-full bg-[#25B700] dark:bg-blue-500"
              style={{ width: "45%" }}
            ></div>
          </div>
          <img width="45px" src={trophy} alt="Troféu" />
        </div>
        {/* exercicios */}
        <div className="flex flex-col justify-between gap-3">
          <h1 className="text-3xl">Complete o código:</h1>
          <div className="space-y-6 px-8">
            <p>
              Complete o código abaixo para que a condição só seja verdadeira se
              as duas condições forem verdadeiras.
            </p>
            <code className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="h-1 w-1 rounded-full bg-zinc-100" />

                <p>
                  let temConvite = <span className="text-lime-500">true</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-1 w-1 rounded-full bg-zinc-100" />

                <p>
                  let nomeNaLista = <span className="text-red-600">false</span>
                </p>
              </div>
            </code>
          </div>
        </div>

        <div className="mt- flex h-full items-center justify-center">
          
        </div>

        <div className="m-auto flex w-full items-center justify-center gap-18">
          <QuestionButton text="||" onClick={() => console.log("click")} />
          <QuestionButton text="&&" onClick={() => console.log("click")} />
          <QuestionButton
            text="temConvite"
            onClick={() => console.log("click")}
          />
          <QuestionButton
            text="!temConvite && nomeNaLista"
            onClick={() => console.log("click")}
          />
        </div>
      </div>
      <div className="flex h-2 w-full justify-center border-t-1 pt-24">
        <SubmitButton text="Verificar" onClick={() => console.log("click")} />
      </div>
    </div>
  );
}
