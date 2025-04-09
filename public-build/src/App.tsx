import {useEffect, useState} from 'react';
import {DataGrid, GridColDef, GridRowId} from '@mui/x-data-grid';
import './index.css'
import {IKeywordType} from "./shared/types.ts";

function App() {
  const [rowsData, setRowsData] = useState<Array<IKeywordType>>([]);

  useEffect(() => {
    fetch('http://localhost:4554/api/keywords/tok')
      .then((v) => v.json())
      .then(data => setRowsData(data));
  }, [])

  const cols: GridColDef<(typeof rowsData)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 150, sortable: true },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true,
    },
    {
      field: 'keywords',
      headerName: 'Keywords',
      width: 300,
      editable: true,
    },
    {
      field: 'emiton',
      headerName: 'Emit on',
      type: 'number',
      width: 100,
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
  }

  return (
    <>
      <header>
        <h3> TelegramAutoResolverBot - Keyword editor </h3>
      </header>
      <section>
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
          <input type='button' value='Принять' onClick={saveData}/>
          <input type='button' alt='cancel' value='Отменить'/>
        </div>
      </section>
    </>
  )
}

export default App
