"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { sources, sourceNames } from "@/lib/sources";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

// @ts-expect-error - Babel standalone doesn't have types
import * as Babel from "@babel/standalone";
import babelPluginHydroxide from "babel-plugin-hydroxide";

function compileSource(source: string): string {
  try {
    const result = Babel.transform(source, {
      plugins: [babelPluginHydroxide],
    });
    return result?.code ?? "";
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return "Unknown error occurred";
  }
}

export function CompilerPlayground() {
  const { resolvedTheme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sourceCode, setSourceCode] = useState(sources[0]);
  const [compiledCode, setCompiledCode] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editorTheme = resolvedTheme === "dark" ? githubDark : githubLight;

  useEffect(() => {
    setCompiledCode(compileSource(sourceCode));
  }, [sourceCode]);

  const handleSourceChange = useCallback((value: string) => {
    setSourceCode(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setCompiledCode(compileSource(value));
    }, 200);
  }, []);

  const handleExampleSelect = useCallback((index: number) => {
    setSelectedIndex(index);
    const newSource = sources[index];
    setSourceCode(newSource);
    setCompiledCode(compileSource(newSource));
  }, []);

  return (
    <>
      <AppSidebar
        selectedIndex={selectedIndex}
        onSelect={handleExampleSelect}
      />
      <SidebarInset className="h-full min-h-0">
        {/* Mobile Title */}
        <div className="bg-background border-border flex border-b p-4 md:hidden">
          <span className="font-serif text-2xl font-medium">
            Hydroxide Compiler
          </span>
        </div>

        {/* Mobile Header */}
        <header className="bg-background border-border flex items-center gap-2 border-b px-4 py-3 md:hidden">
          <SidebarTrigger className="-ml-1" />
          <span className="text-foreground text-sm">
            {sourceNames[selectedIndex]}
          </span>
        </header>

        <div className="grid h-full w-full grid-cols-1 md:h-full lg:grid-cols-2">
          {/* Source Editor */}
          <div className="border-border flex min-h-0 flex-col border-b md:border-r md:border-b-0">
            <div className="bg-background border-border flex shrink-0 items-center border-b p-4">
              <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Source
              </span>
            </div>
            <div className="editor-container min-h-0 flex-1">
              <CodeMirror
                value={sourceCode}
                height="100%"
                theme={editorTheme}
                extensions={[javascript({ jsx: true })]}
                onChange={handleSourceChange}
                className="h-full"
                spellCheck={false}
                basicSetup={{
                  lineNumbers: false,
                  highlightActiveLineGutter: true,
                  highlightActiveLine: true,
                  foldGutter: false,
                  bracketMatching: true,
                  closeBrackets: true,
                  autocompletion: false,
                  highlightSelectionMatches: true,
                }}
              />
            </div>
          </div>

          {/* Compiled Output */}
          <div className="flex min-h-0 flex-col">
            <div className="bg-background border-border flex shrink-0 items-center border-b p-4">
              <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Compiled
              </span>
            </div>
            <div className="editor-container min-h-0 flex-1">
              <CodeMirror
                value={compiledCode}
                height="100%"
                theme={editorTheme}
                extensions={[javascript({ jsx: true })]}
                readOnly
                className="h-full"
                spellCheck={false}
                basicSetup={{
                  lineNumbers: false,
                  highlightActiveLineGutter: false,
                  highlightActiveLine: false,
                  foldGutter: false,
                  bracketMatching: true,
                  autocompletion: false,
                }}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
