const noteMap = [
    // 1st row
    [
        { note: 'G', accidental: '#', octave: 3 },
        { note: 'A', accidental: '', octave: 3 },
        { note: 'A', accidental: '#', octave: 3 },
        { note: 'B', accidental: '', octave: 3 },
        { note: 'C', accidental: '', octave: 4 },
        { note: 'C', accidental: '#', octave: 4 },
        { note: 'D', accidental: '', octave: 4 },
        { note: 'D', accidental: '#', octave: 4 }
    ],
    // 2nd row
    [
        {note:'C', accidental:'', octave:3},
        {note:'C', accidental:'#', octave:3},
        {note:'D', accidental:'', octave:3},
        {note:'D', accidental:'#', octave:3},
        {note:'E', accidental:'', octave:3},
        {note:'F', accidental:'', octave:3},
        {note:'F', accidental:'#', octave:3},
        {note:'G', accidental:'', octave:3}
    ],
    // 3rd row
    [
        {note:'E', accidental:'', octave:2},
        {note:'F', accidental:'', octave:2},
        {note:'F', accidental:'#', octave:2},
        {note:'G', accidental:'', octave:2},
        {note:'G', accidental:'#', octave:2},
        {note:'A', accidental:'', octave:2},
        {note:'A', accidental:'#', octave:2},
        {note:'B', accidental:'', octave:2}
    ],
    // 4th row
    [
        {note:'G', accidental:'#', octave:1},
        {note:'A', accidental:'', octave:1},
        {note:'A', accidental:'#', octave:1},
        {note:'B', accidental:'', octave:1},
        {note:'C', accidental:'', octave:2},
        {note:'C', accidental:'#', octave:2},
        {note:'D', accidental:'', octave:2},
        {note:'D', accidental:'#', octave:2}
    ],
    // 5th row
    [
        {note:'C', accidental:'', octave:1},
        {note:'C', accidental:'#', octave:1},
        {note:'D', accidental:'', octave:1},
        {note:'D', accidental:'#', octave:1},
        {note:'E', accidental:'', octave:1},
        {note:'F', accidental:'', octave:1},
        {note:'F', accidental:'#', octave:1},
        {note:'G', accidental:'', octave:1}
    ],
    // 6th row
    [
        {note:'E', accidental:'', octave:0},
        {note:'F', accidental:'', octave:0},
        {note:'F', accidental:'#', octave:0},
        {note:'G', accidental:'', octave:0},
        {note:'G', accidental:'#', octave:0},
        {note:'A', accidental:'', octave:0},
        {note:'A', accidental:'#', octave:0},
        {note:'B', accidental:'', octave:0}
    ],
    // 7th row
    [
        {note:'G', accidental:'#', octave:-1},
        {note:'A', accidental:'', octave:-1},
        {note:'A', accidental:'#', octave:-1},
        {note:'B', accidental:'', octave:-1},
        {note:'C', accidental:'', octave:0},
        {note:'C', accidental:'#', octave:0},
        {note:'D', accidental:'', octave:0},
        {note:'D', accidental:'#', octave:0}
    ],
    //8th row
    [
        {note:'C', accidental:'', octave:-1},
        {note:'C', accidental:'#', octave:-1},
        {note:'D', accidental:'', octave:-1},
        {note:'D', accidental:'#', octave:-1},
        {note:'E', accidental:'', octave:-1},
        {note:'F', accidental:'', octave:-1},
        {note:'F', accidental:'#', octave:-1},
        {note:'G', accidental:'', octave:-1}
    ]
]
function returnXY(name, accidental, octave) {
    for(let i = 0; i < noteMap.length; i++){
        for(j = 0; j < noteMap[i].length; j++){
            let note = noteMap[i][j];
            if(note.note == name && note.accidental==accidental && note.octave == octave){
                // console.log("found match")
                return {x: j/8, y: i/8}
            }
        }
    }
}