import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { api } from "@/lib/axios";

interface Prompt {
  id: string
  title: string
  template: string
}
interface PromptSelectProps {
  onPromptSelected: (template: string) => void
}
export function PromptSelect (props: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  useEffect(()=>{
    api.get('/prompts').then(response => {
      setPrompts(response.data)
    })
  },[])

  function handlePromptSelected(promptId: string) {
    const selectdPrompt = prompts?.find(prompt => prompt.id === promptId)

    if(!selectdPrompt){
      return
    }

    props.onPromptSelected(selectdPrompt.template)
  }

  return(
    <Select onValueChange={handlePromptSelected}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um prompt"/>
        </SelectTrigger>
        <SelectContent>
          {prompts?.map(prompt => {
            return(
              <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
            )
          })}
        </SelectContent>
      </Select>
  )
}