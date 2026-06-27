'use client'

import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Chip,
    Stack,
    Divider,
} from "@mui/material";

import { ReadingRecord, ReadingType } from "@/types/type";


interface HistoryPanelProps {
    history:ReadingRecord[];
    onDelete:(id:string) => void;
}


const TYPE_EMOJI: Record<ReadingType, string> = {
    Today:"🌙",
    Love:"💕",
    Career:"💼",
    Wellbeing:"🌿",
    "Yes/No":"🎱",
}

const HistoryPanel = ({ history, onDelete }: HistoryPanelProps ) => {
    if(history.length === 0) {
        return(
            <Box
            sx={{
                textAlign:"center",
                py:10,
                border:"0.5px dashed rgba(255,255,255,0.08)",
                borderRadius:4,
            }}
            >
                <Typography variant="body2" color="text.secondary">
                    No reading yet. Draw your first cards!
                </Typography>
            </Box>
        )
    }

    return(
        <Box>
            <Typography
            variant="caption"
            sx={{
                color:"text.secondary",
                textTransform:"uppercase",
                letterSpacing:"0.08em",
                display:"block",
                mb:2,
            }}
            >
                {history.length} past reading{history.length !== 1? "s" : ""}
            </Typography>

            <Stack spacing={1.5}>
                {history.map((record) => (
                    <Card key={record.id}>
                        <CardContent sx={{ p:2, "&:last-child" :{ pb:2} }}>
                            <Box
                            sx={{
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"flex-start",
                            }}
                            >
                                <Box sx={{ display:"flex", alignItems:"center", gap:1.5 }}>
                                    <Typography sx={{ fontSize: "1.5rem"}} >
                                        {TYPE_EMOJI[record.type]}
                                    </Typography>
                                    <Box>
                                        <Typography
                                        variant="body2"                                                                                  
                                        sx={{                                              
                                            fontSize:"13px",
                                            fontWeight:500,
                                        }}
                                        >
                                            {record.type} Reading
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {record.cards.map((d) => d.card.name).join(" . ")}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display:"flex", alignItems:"center", gap:1}}>
                                    <Typography variant="caption" color="text.secondary">
                                        {record.createdAt}
                                    </Typography>
                                    <IconButton
                                    size="small"
                                    onClick={() => onDelete(record.id)}
                                    sx={{
                                        color:"text.disabled",
                                        "&:hover": {color:"error.main" },
                                    }}
                                    >
                                        🗑️
                                    </IconButton>
                                </Box>
                            </Box>

                            <Divider sx={{ my:1.5, borderColor:"rgba(255,255,255,0.05)"}} />

                            <Box sx={{ display:"flex", gap:1, flexWrap:"wrap" }}>
                                {record.cards.map((drawn, i ) => (
                                    <Chip 
                                    key={i}
                                    label={`${drawn.position}: ${drawn.card.name} ${drawn.reversed ? " ↓" : " "}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        fontSize:"10px",
                                        height:22,
                                        borderColor:"rgba(201,184,255,0.2)",
                                        color:"primary.light",
                                    }}
                                    />
                                   
                                ))}

                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    )
}

export default HistoryPanel;