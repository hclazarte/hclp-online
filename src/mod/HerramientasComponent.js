import { useState } from "react";

const HerramientasComponent = () => {
  const [modo, setModo] = useState("consulta"); // Modos: consulta, navegacion, edicion
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(
    "¿Estás seguro que deseas borrar este registro?",
  );
  const onConfirm = () => {
    setShowDialog(!showDialog);
  };
  const handleCloseDialog = () => {
    setShowDialog(!showDialog);
  };
  const manejarClick = (boton) => {
    if (boton === "nuevo" || boton === "editar") {
      setModo("edicion"); // Reglas 5 y 6
    } else if (boton === "borrar") {
      setModo("navegacion"); // Regla 7
      setShowDialog(!showDialog);
    } else if (boton === "grabar" || boton === "cancelar") {
      setModo("navegacion"); // Reglas 8 y 9
    } else if (boton === "limpiar") {
      setModo("consulta"); // Regla 10
    } else if (boton === "consultar") {
      setModo("navegacion"); // Regla 11
    }
  };
  const esHabilitado = (boton) => {
    const botonesPorModo = {
      consulta: ["consultar"],
      navegacion: [
        "nuevo",
        "editar",
        "borrar",
        "primero",
        "anterior",
        "siguiente",
        "ultimo",
        "limpiar",
      ],
      edicion: ["grabar", "cancelar"],
    };
    return botonesPorModo[modo].includes(boton);
  };

  return (
    <div className="bg-inf2 border border-inf4 rounded-lg shadow-md p-2 flex gap-4">
      <div className="flex flex-wrap justify-center gap-1 p-1 bg-inf1 rounded-md">
        <div className="flex flex-wrap gap-1 justify-between w-auto">
          <button
            onClick={() => manejarClick("nuevo")}
            className={`p-1 rounded ${esHabilitado("nuevo") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <path
                d="M24 21V27M27 24H21"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 26H10C9.73478 26 9.48043 25.8946 9.29289 25.7071C9.10536 25.5196 9 25.2652 9 25V10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9H19.59C19.8523 9.0011 20.1037 9.10526 20.29 9.29L23.71 12.71C23.8947 12.8963 23.9989 13.1477 24 13.41V17"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => manejarClick("editar")}
            className={`p-1 rounded ${esHabilitado("editar") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <path
                d="M27.6251 12.0523L23.9735 8.37552C23.7322 8.13501 23.4057 8 23.0653 8C22.7249 8 22.3983 8.13501 22.157 8.37552L9.21153 21.3252L8.02958 26.4353C7.9888 26.6221 7.9902 26.8157 8.03367 27.0019C8.07714 27.188 8.16157 27.3622 8.28081 27.5115C8.40005 27.6608 8.55109 27.7815 8.72287 27.8649C8.89466 27.9482 9.08287 27.9921 9.27374 27.9933C9.36268 28.0022 9.4523 28.0022 9.54124 27.9933L14.6983 26.8092L27.6251 13.872C27.8652 13.6302 28 13.3031 28 12.9621C28 12.6211 27.8652 12.294 27.6251 12.0523ZM14.0762 25.6875L9.24264 26.7033L10.3437 21.9546L20.0295 12.2891L23.762 16.0282L14.0762 25.6875ZM24.5956 15.1246L20.8631 11.3855L23.028 9.22928L26.6982 12.9684L24.5956 15.1246Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            onClick={() => manejarClick("borrar")}
            className={`p-1 rounded ${esHabilitado("borrar") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <g clip-path="url(#clip0_56_28)">
                <path
                  d="M18 6C11.3731 6 6 11.3731 6 18C6 24.6262 11.3731 30 18 30C24.6262 30 30 24.6262 30 18C30 11.3731 24.6262 6 18 6ZM24.6495 22.0778L22.0785 24.6487L18 20.5709L13.9222 24.6487L11.3513 22.0778L15.4291 18L11.3513 13.9222L13.9222 11.3513L18 15.4291L22.0778 11.3513L24.6487 13.9222L20.5709 18L24.6495 22.0778Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_56_28">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(6 6)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button
            onClick={() => manejarClick("grabar")}
            className={`p-1 rounded ${esHabilitado("grabar") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <path
                d="M25.8571 8H10.1429C8.95929 8 8 8.95929 8 10.1429V25.8571C8 27.0407 8.95929 28 10.1429 28H25.8571C27.0407 28 28 27.0407 28 25.8571V10.1429C28 8.95929 27.0407 8 25.8571 8ZM24.4286 8.71429V15.1429H11.5714V8.71429H24.4286ZM13.7143 27.2857V21.5714H22.2857V27.2857H13.7143ZM27.2857 25.8571C27.2857 26.645 26.645 27.2857 25.8571 27.2857H23V21.5714C23 21.1771 22.68 20.8571 22.2857 20.8571H13.7143C13.32 20.8571 13 21.1771 13 21.5714V27.2857H10.1429C9.355 27.2857 8.71429 26.645 8.71429 25.8571V10.1429C8.71429 9.355 9.355 8.71429 10.1429 8.71429H10.8571V15.1429C10.8571 15.5371 11.1771 15.8571 11.5714 15.8571H24.4286C24.8229 15.8571 25.1429 15.5371 25.1429 15.1429V8.71429H25.8571C26.645 8.71429 27.2857 9.355 27.2857 10.1429V25.8571ZM20.8571 14.4286H23C23.3943 14.4286 23.7143 14.1086 23.7143 13.7143V10.1429C23.7143 9.74857 23.3943 9.42857 23 9.42857H20.8571C20.4629 9.42857 20.1429 9.74857 20.1429 10.1429V13.7143C20.1429 14.1086 20.4629 14.4286 20.8571 14.4286ZM20.8571 10.1429H23V13.7143H20.8571V10.1429ZM20.8571 23.3571C20.8571 23.5543 20.6971 23.7143 20.5 23.7143H15.5C15.3029 23.7143 15.1429 23.5543 15.1429 23.3571C15.1429 23.16 15.3029 23 15.5 23H20.5C20.6971 23 20.8571 23.16 20.8571 23.3571ZM20.8571 24.7857C20.8571 24.9829 20.6971 25.1429 20.5 25.1429H15.5C15.3029 25.1429 15.1429 24.9829 15.1429 24.7857C15.1429 24.5886 15.3029 24.4286 15.5 24.4286H20.5C20.6971 24.4286 20.8571 24.5886 20.8571 24.7857Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            onClick={() => manejarClick("cancelar")}
            className={`p-1 rounded ${esHabilitado("cancelar") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <path
                d="M18 27C22.9706 27 27 22.9706 27 18C27 13.0294 22.9706 9 18 9C13.0294 9 9 13.0294 9 18C9 22.9706 13.0294 27 18 27Z"
                stroke="white"
                stroke-width="2"
              />
              <path d="M24 24L12 12" stroke="white" stroke-width="2" />
            </svg>
          </button>
          <button
            onClick={() => manejarClick("limpiar")}
            className={`p-1 rounded ${esHabilitado("limpiar") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <path
                d="M22.5859 22.2753C23.3361 21.3774 23.8862 20.3299 24.1995 19.2026C24.5128 18.0754 24.5821 16.8942 24.4028 15.738C24.2234 14.5819 23.7996 13.4772 23.1595 12.4978C22.5194 11.5184 21.6778 10.6868 20.6908 10.0584L19.9416 11.3559C20.9195 11.9957 21.7145 12.8785 22.2487 13.9179C22.7829 14.9572 23.0381 16.1175 22.9891 17.2851C22.9402 18.4526 22.5889 19.5875 21.9695 20.5785C21.3502 21.5695 20.4841 22.3826 19.4561 22.9383C18.428 23.494 17.2733 23.7732 16.105 23.7485C14.9366 23.7238 13.7947 23.3961 12.7911 22.7975C11.7874 22.1988 10.9565 21.3498 10.3796 20.3336C9.80266 19.3173 9.49958 18.1686 9.5 17H8C7.9988 18.5678 8.44472 20.1035 9.28546 21.4269C10.1262 22.7503 11.3269 23.8065 12.7467 24.4715C14.1665 25.1366 15.7465 25.3831 17.3014 25.1819C18.8563 24.9807 20.3216 24.3404 21.5254 23.3358L27.1894 29L28.25 27.9394L22.5859 22.2753Z"
                fill="white"
              />
              <path
                d="M13 8V14M16 11H10"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => manejarClick("consultar")}
            className={`p-1 rounded ${esHabilitado("consultar") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <path
                d="M14 19.25C14.6213 19.25 15.125 18.7463 15.125 18.125C15.125 17.5037 14.6213 17 14 17C13.3787 17 12.875 17.5037 12.875 18.125C12.875 18.7463 13.3787 19.25 14 19.25Z"
                fill="white"
              />
              <path
                d="M14.75 15.5H13.25V12.5H14.75C15.1478 12.5 15.5294 12.342 15.8107 12.0607C16.092 11.7794 16.25 11.3978 16.25 11C16.25 10.6022 16.092 10.2206 15.8107 9.93934C15.5294 9.65804 15.1478 9.5 14.75 9.5H13.25C12.8523 9.50046 12.4711 9.65864 12.1898 9.93984C11.9086 10.221 11.7505 10.6023 11.75 11V11.375H10.25V11C10.2509 10.2046 10.5673 9.44208 11.1297 8.87967C11.6921 8.31725 12.4546 8.00089 13.25 8H14.75C15.5456 8 16.3087 8.31607 16.8713 8.87868C17.4339 9.44129 17.75 10.2044 17.75 11C17.75 11.7956 17.4339 12.5587 16.8713 13.1213C16.3087 13.6839 15.5456 14 14.75 14V15.5Z"
                fill="white"
              />
              <path
                d="M22.5859 22.2753C23.3361 21.3774 23.8862 20.3299 24.1995 19.2026C24.5128 18.0754 24.5821 16.8942 24.4028 15.738C24.2234 14.5819 23.7996 13.4772 23.1595 12.4978C22.5194 11.5184 21.6778 10.6868 20.6908 10.0584L19.9416 11.3559C20.9195 11.9957 21.7145 12.8785 22.2487 13.9179C22.7829 14.9572 23.0381 16.1175 22.9891 17.2851C22.9402 18.4526 22.5889 19.5875 21.9695 20.5785C21.3502 21.5695 20.4841 22.3826 19.4561 22.9383C18.428 23.494 17.2733 23.7732 16.105 23.7485C14.9366 23.7238 13.7947 23.3961 12.7911 22.7975C11.7874 22.1988 10.9565 21.3498 10.3796 20.3336C9.80266 19.3173 9.49958 18.1686 9.5 17H8C7.9988 18.5678 8.44472 20.1035 9.28546 21.4269C10.1262 22.7503 11.3269 23.8065 12.7467 24.4715C14.1665 25.1366 15.7465 25.3831 17.3014 25.1819C18.8563 24.9807 20.3216 24.3404 21.5254 23.3358L27.1894 29L28.25 27.9394L22.5859 22.2753Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-1 justify-between w-auto">
          <button
            className={`p-1 rounded ${esHabilitado("primero") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <path
                d="M28 28V8L10.8986 18L28 28ZM10.8986 8V28H8V8H10.8986Z"
                fill="white"
                stroke="Primero"
                stroke-width="0.24"
              />
            </svg>
          </button>
          <button
            className={`p-1 rounded ${esHabilitado("anterior") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <path
                d="M28 8V28L8 18L28 8Z"
                fill="white"
                stroke="#777777"
                stroke-width="0.24"
              />
            </svg>
          </button>
          <div
            className="p-2 border border-inf3 rounded flex justify-center items-center"
            style={{ width: "140px" }}
          >
            <span className="text-center text-inf6">10/100</span>
          </div>
          <button
            className={`p-1 rounded ${esHabilitado("siguiente") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <path
                d="M8 28V8L28 18L8 28Z"
                fill="white"
                stroke="#777777"
                stroke-width="0.24"
              />
            </svg>
          </button>
          <button
            className={`p-1 rounded ${esHabilitado("ultimo") ? "bg-inf4 text-white" : "bg-inf3 opacity-50 cursor-not-allowed"}`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#527dd6" />
              <path
                d="M8 27V7L25.1014 17L8 27ZM25.1014 7H28V27H25.1014V7Z"
                fill="white"
                stroke="#777777"
                stroke-width="0.24"
              />
            </svg>
          </button>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-inf2 p-6 rounded-lg shadow-lg text-center m-6">
            <p className="mb-4 text-lg font-semibold">{dialogMessage}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  if (onConfirm) onConfirm();
                  handleCloseDialog();
                }}
                className="px-6 py-3 bg-inf7 text-white rounded-md font-medium"
              >
                Confirmar
              </button>
              <button
                onClick={handleCloseDialog}
                className="px-6 py-3 bg-inf7 text-white rounded-md font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HerramientasComponent;
