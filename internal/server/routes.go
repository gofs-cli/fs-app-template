package server

import (
	"net/http"

	"github.com/gofs-cli/fs-app-template/internal/server/assets"
	"github.com/gofs-cli/fs-app-template/internal/server/handlers"
	"github.com/gofs-cli/fs-app-template/internal/ui/pages/home"
	"github.com/gofs-cli/fs-app-template/internal/ui/pages/notfound"
)

func (s *Server) Routes() {
	// filserver route for assets
	assetMux := http.NewServeMux()
	assetMux.Handle("GET /{path...}", http.StripPrefix("/assets/", handlers.NewHashedAssets(assets.FS)))
	s.r.Handle("GET /assets/{path...}", s.assetsMiddlewares(assetMux))

	// handlers for normal routes with all general middleware
	routesMux := http.NewServeMux()
	routesMux.Handle("GET /{$}", home.Index())
	routesMux.Handle("GET /", notfound.Index())

	s.r.Handle("/", s.routeMiddlewares(routesMux))

	s.srv.Handler = s.r
}
