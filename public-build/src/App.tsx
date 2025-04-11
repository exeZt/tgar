import {useEffect, useState} from 'react';
import {DataGrid, GridColDef, GridRowId} from '@mui/x-data-grid';
import './index.css'
import {IKeywordType} from "./shared/types.ts";
import {toast, ToastContainer} from "react-toastify";
import {getCookie} from "./utils.ts";
import lang_en from "./assets/lang/en.json";
import lang_ru from "./assets/lang/ru.json";
import {Language} from "./assets/lang/cfg.tsx";

function App() {
  const [rowsData, setRowsData] = useState<Array<IKeywordType>>([]);
  const [selectedLanguage, setSelectedLanguage] = useState(getCookie('lang') ?? 'en');
  const [langFile, setLangFile] = useState<typeof lang_ru>(lang_en);

  useEffect(() => {
    if (typeof getCookie("lang") === "undefined"){
      document.cookie = `lang=${'en'}; path=/;`;
    }

    fetch('http://localhost:4554/api/keywords/tok')
      .then((v) => v.json())
      .then(data => setRowsData(data))
      .catch(() => toast.error(langFile?.MAIN_PAGE.TOAST_FETCH_KEYWD_ERROR));
  }, []);

  useEffect(() => {
    document.cookie = `lang=${selectedLanguage}; path=/;`;
    for (let i = 0; i < Language.length; i++) {
      const v = Language[i];
      if (Object.keys(v)[0] === selectedLanguage) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setLangFile(v[selectedLanguage]);
        break;
      }
    }
  }, [selectedLanguage]);

  const cols: GridColDef<(typeof rowsData)[number]>[] = [
    { field: 'id',
      headerName: langFile?.MAIN_PAGE.TABLE_FIELD_0,
      width: 150,
      sortable: true
    },
    {
      field: 'name',
      headerName: langFile?.MAIN_PAGE.TABLE_FIELD_1,
      width: 200,
      editable: true,
    },
    {
      field: 'keywords',
      headerName: langFile?.MAIN_PAGE.TABLE_FIELD_2,
      width: 300,
      editable: true,
    },
    {
      field: 'emiton',
      headerName: langFile?.MAIN_PAGE.TABLE_FIELD_3,
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'response',
      headerName: langFile?.MAIN_PAGE.TABLE_FIELD_4,
      type: 'string',
      width: 300,
      editable: true,
    }
  ]

  const updateRowData = async (newRow: IKeywordType, rowId: { rowId: GridRowId }): Promise<IKeywordType> => {
    console.log(rowId, newRow);
    setRowsData((prevState): Array<IKeywordType> =>
      prevState.map((v) => v.id !== newRow.id ? v : newRow));
    return newRow;
  }

  function saveData(): void {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", 'http://localhost:4554/api/keywords/update', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(rowsData));
    xhr.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      xhr.status === 200
        ? toast.success(langFile?.MAIN_PAGE.TOAST_SAVE_SUCCESSFULLY)
        : toast.error(langFile?.MAIN_PAGE.TOAST_SAVE_FAILED)
    }
  }

  return (
    <>
      <header>
        <h3> TelegramAutoResolverBot - Keyword editor </h3>
        <div>
          <label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value='ru'> RU </option>
              <option value='en'> EN </option>
              <option value='by'> BY </option>
            </select>
          </label>
        </div>
      </header>
      <section className='app-content'>
        <form>
          <DataGrid
            rows={rowsData}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  page: 0,
                }
              }
            }}
            processRowUpdate={(updated: IKeywordType, _oldRow: IKeywordType, rowId): Promise<IKeywordType> =>
              updateRowData(updated, rowId)}
            columns={cols}
            pageSizeOptions={[5]}
            checkboxSelection={true}
            disableRowSelectionOnClick={true}
          />
        </form>
        <div>
          <input type='button' value={langFile?.MAIN_PAGE.BUTTON_APPROVE_EDITION} onClick={saveData}/>
          <input type='button' alt='cancel' value={langFile?.MAIN_PAGE.BUTTON_CANCEL_EDITION} hidden/>
        </div>
      </section>
      <ToastContainer
        position={"top-right"}
        autoClose={1500}
        newestOnTop
      />
    </>
  )
}

export default App
