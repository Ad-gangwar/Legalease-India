import { createContext} from "react";

// Create a React context for managing song-related state
const serviceProviderContext = createContext({
    // Initial state values for the context
    selectedServiceProvider: null,
    setSelectedServiceProvider: (serviceProvider) => {},
});

export default serviceProviderContext;

