import "./App.css";
import { useState, useEffect, useRef } from "react";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputNumber } from "primereact/inputnumber";
import { RiArrowDownWideFill } from "@remixicon/react";
import axios from "axios";
function App() {
  const [page_no, setPage_no] = useState<number>(1);
  const [page, setPage] = useState<any>();
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [numberOfRows, _setNumberOfRows] = useState<number>(12);
  const [rowClick, _setRowClick] = useState<boolean>(true);
  const [selectionValue, setSelectionValue] = useState<number>(4);
  const [numberOfAutoSelectedRows, setNumberOfAutoSelectedRows] = useState<number>(0);
  const [nextAutoSelectPage, setNextAutoSelectPage] = useState<number>(1);
  // refs
  const op = useRef<OverlayPanel>(null);

  // Fetch API data when component mounts or page_no changes
  useEffect(() => {
    fetchAPI();
  }, [page_no]);

  // Handle auto-selection when navigating to new pages
  useEffect(() => {
    if (selectionValue > 0 && page) {
      const rowsToSelect = Math.min(selectionValue, page.length);
      const autoSelectRows = page.slice(0, rowsToSelect);
      
      setSelectedRows((prev: any) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return [...prevArray, ...autoSelectRows];
      });

      if (selectionValue > page.length) {
        setNumberOfAutoSelectedRows(selectionValue - page.length);
        setNextAutoSelectPage(page_no + 1);
      } else {
        // Reset auto-selection state
        setNumberOfAutoSelectedRows(0);
        // setNextAutoSelectPage(1);
    }
    }
  }, [selectionValue]);

  useEffect(() => {
    if (numberOfAutoSelectedRows > 0 && page && page_no === nextAutoSelectPage) {
      const rowsToSelect = Math.min(numberOfAutoSelectedRows, page.length);
      const autoSelectRows = page.slice(0, rowsToSelect);
      setSelectedRows((prev: any) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return [...prevArray, ...autoSelectRows];
      });
      const newRemaining = numberOfAutoSelectedRows - rowsToSelect;
      setNumberOfAutoSelectedRows(newRemaining);
      
      if (newRemaining > 0) {
        setNextAutoSelectPage(page_no + 1);
      } else {
        // setNextAutoSelectPage(1);
      }
    }
  }, [page]);
 // Reset auto-selection state when all the selectedRows deselected
  useEffect(() => {
    if(selectedRows.length <= 0) {
      setNumberOfAutoSelectedRows(0);
      setNextAutoSelectPage(1);
    }
  }, [selectedRows]);

  let apiURL = `https://api.artic.edu/api/v1/artworks?page=${page_no}`;

  const fetchAPI = async (): Promise<any> => {
    // Fetch data from the API
    let response = await axios.get(apiURL);
    let data = response.data.data;
    data = data.map((item: any) => ({
      id: item.id,
      title: item.title,
      place_of_origin: item.place_of_origin,
      artist_display: item.artist_display,
      inscriptions: item.inscriptions,
      date_start: item.date_start,
      date_end: item.date_end,
    }));
    setPage(data);
  };
 // Handle page change event
  const onPageChange = (event: any) => {
    setPage_no(event.page + 1);
  };

  return (
    <>
      <section id="pagination-container">
        <h1>Pagination Component</h1>
        <div>
          <PrimeReactProvider>
            <PrimeReactContext.Consumer>
              {() => (
                <DataTable
                  value={page}
                  selectionMode={rowClick ? null : "checkbox"}
                  selection={selectedRows}
                  onSelectionChange={(e: any) => setSelectedRows(e.value)}
                  dataKey="id"
                  tableStyle={{ minWidth: "50rem" }}
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                  ></Column>
                  <Column
                    header={() => (
                      <RiArrowDownWideFill
                        size={36}
                        color="black"
                        onLoad={(e: any) => {
                          e.target.style.rotate = "0deg";
                        }}
                        onClick={(e: any) => {
                          op.current?.toggle(e);
                          if (e.target.style.rotate === "0deg") {
                            e.target.style.rotate = "180deg";
                          } else {
                            e.target.style.rotate = "0deg";
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    headerStyle={{ width: "5rem" }}
                  ></Column>
                  <Column field="title" header="Title"></Column>
                  <Column
                    field="place_of_origin"
                    header="Place of Origin"
                  ></Column>
                  <Column
                    field="artist_display"
                    header="Artist Display"
                  ></Column>
                  <Column field="inscriptions" header="Inscriptions"></Column>
                  <Column field="date_start" header="Start Date"></Column>
                  <Column field="date_end" header="Start End"></Column>
                </DataTable>
              )}
            </PrimeReactContext.Consumer>
            <OverlayPanel ref={op}>
              <InputNumber
                value={selectionValue}
                onValueChange={(e: any) => setSelectionValue(e.value)}
                useGrouping={false}
              />
            </OverlayPanel>
            <Paginator
              first={(page_no - 1) * numberOfRows}
              rows={numberOfRows}
              totalRecords={120}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />{" "}
            {/* By css total records will be hidden */}
          </PrimeReactProvider>
        </div>
      </section>
    </>
  );
}

export default App;
