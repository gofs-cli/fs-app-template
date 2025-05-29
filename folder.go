package folder

import (
	"embed"
	"runtime/debug"
)

//go:embed all:*
var Folder embed.FS

var ModuleName string

func init() {
	bi, ok := debug.ReadBuildInfo()
	if !ok {
		panic("could not read build info in azure template")
	}
	ModuleName = bi.Main.Path
}
