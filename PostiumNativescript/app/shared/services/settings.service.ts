import { OpaqueToken } from "@angular/core";

export const BackendUri: OpaqueToken = new OpaqueToken("BackendUri");

export const BackendUriProvider = {
    provide: BackendUri,
    useValue: "http://localhost:8000/api/1.0"
};
