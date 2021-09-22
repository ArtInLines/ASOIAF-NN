# ASOIAF-NN

This is my attempt at making a neural network for determining which character in the next book of _A Song of Ice and Fire_ - _The Winds of Winter_ - will die.

This is just for fun and to learn how to code neural networks with Tenserflow

## Input Data

==> Data Points about a single person

-   Sex: ["m", "f"] -- maybe translate values into [-1, 1]?
-   Age: Positive Integer -- what about characters, whose age is unknown?
-   House:
    -   ["None", "Stark", etc.]
    -   maybe add mix-versions to show the mix of different houses in people? (i.e. for Joffrey, etc.)
    -   maybe have it mean which house they are allied to, instead of born to (i.e. Hodor is of House Stark)
-   isHighBorn: [0, 1]
-   Location:
    -   ["Riverlands", "North", "The Wall", etc.]
    -   indicates the current location of the character
    -   maybe translate vague place-names into pseudo-coordinates, which would show the relation between places? (How would I do that though?)
-   Birthplace:
    -   same type of data as for "Location"
    -   decide whether this is relevant
-   isEunuch: [0, 1]
-   isWarg: [0, 1]
-   isMagicUser: [0, 1] -- magicUser might be difficult to define
-   hasValyrianSteel: [0, 1]
-   hasDragonGlass: [0, 1]
-   isPOV: [0, 1] - whether the character is a POV in this book
-   wasPOV: [0, 1] - whether the character was a POV in an earlier book
-   title:
    -   ["None", "Knight", "Lord", "Lord Paramount" etc.]
    -   maybe translate the titles to numbers, with higher numbers corresponding to higher titles
-   appears: [0, 1] - if False, the character must be mentioned in this book
-   isBastard: [0, 1] -- maybe change to a list of bastard names, i.e. "Snow", "Stone", etc (Might be weird for secret bastards?)
-   isMissing: [0, 1] -- maybe remove this property, as it is only applicable to very few characters like "Arya"
-   isThoughtDead: [0, 1] -- maybe remove this property, as it is only applicable to very few characters like "Bran" or "Rickon"
-   isPretendingToBeSomeoneElse: [0, 1] -- property name is too long, lmao -- applies also to only very few people like "Sansa"
-   isMarried: [0, 1] -- seems irrelevant, might remove
-   hasGreyscale: [0, 1] -- might be contraproductive, since no character died with greyscale yet
-   height: Positive Number in feet
    -   Decide what to do with characters where the height is unknown
-

==> Further Data Points about the book / world outside of the specific character

--> Decide whether this data should be included or removed

-   Season: ["Spring", "Summer", "Autumn", "Winter"] -- decide whether to use this or "Year" / "Book-Nr"
-

### Notes

All Values are meant to represent the characters at the beginning of the book
Values that can be only either 0 or 1 (written [0, 1]) are Boolean values, where **0** means _False_ & **1** means _True_

## Output Data

==> A 32-Bit-Float between 0-1, prediticting whether or not the inputted character dies in the book or not

-   0 = Dies
-   1 = Survives
