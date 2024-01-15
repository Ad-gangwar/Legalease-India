import { createContext, useState } from "react";

// Create a React context for managing song-related state
const lawyerContext = createContext({
    // Initial state values for the context
    selectedLawyer: null,
    setSelectedLawyer: (lawyer) => {}

});

export default lawyerContext;

