import SearchParams from "./search_params";
import ResultSearch from "./result_search";
import { useState } from "react";
import { IHistogramResponse } from "../types/response_types";

const Search = () => {
  const [isResult, setIsResult] = useState(false);
  const [data, setData] = useState<IHistogramResponse>({ data: null });

  return (
    <>
      {isResult ? (
        <ResultSearch data={data} />
      ) : (
        <SearchParams setIsResult={setIsResult} setData={setData} />
      )}
    </>
  );
};

export default Search;
