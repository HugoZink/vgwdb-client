export interface Model {

    /**
     * Returns the current model object as a plain Javascript object.
     * This is useful for e.g. serialization (JSON.stringify),
     * which would otherwise serialize private properties and bypass getters.
     * @returns A plain javascript object.
     */
    toObject();
}