port module Main exposing (main)

import Browser
import Chart as C
import Chart.Attributes as CA
import Chart.Item exposing (getData)
import Html exposing (Html, div, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)


main : Program () Model Msg
main =
    Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }


type alias Data =
    { x : Float, y : Float, z : Float }


type alias Model =
    { data : List Data, currentBg : Maybe Int }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { data = []
      , currentBg = Just 0
      }
    , Cmd.none
    )


type Msg
    = NoOp
    | GetData Data


port getData : (Data -> msg) -> Sub msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        GetData data ->
            let
                currentBg =
                    round data.y
            in
            ( { model | data = model.data ++ [ data ], currentBg = Just currentBg }, Cmd.none )


view : Model -> Html Msg
view model =
    let
        bgText =
            case model.currentBg of
                Just bg ->
                    String.fromInt bg

                Nothing ->
                    "~"
    in
    div []
        [ div [ class "flex flex-col justify-center items-center w-screen " ]
            [ div [] [ text bgText ]
            , div [ class "mt-40 w-full h-[250px] px-16" ]
                [ C.chart
                    [ CA.width 1400
                    , CA.height 300
                    , CA.domain
                        [ CA.lowest 0 CA.orLower
                        , CA.highest 600 CA.orHigher
                        ]
                    , CA.range
                        [ CA.lowest 0 CA.orHigher
                        , CA.highest 60 CA.orHigher
                        ]
                    ]
                    [ C.xLabels [ CA.withGrid ]
                    , C.yLabels [ CA.withGrid, CA.pinned .max, CA.flip ]
                    , C.series .x
                        [ C.scatter .y
                            [ CA.borderWidth 2
                            , CA.size 18
                            , CA.opacity 0
                            ]
                            |> C.variation
                                (\i d ->
                                    [ if d.y >= 250 || d.y < 120 then
                                        CA.border CA.red

                                      else
                                        CA.border CA.purple
                                    ]
                                )
                        ]
                        (List.take 60 (model.data |> List.reverse)
                            |> List.reverse
                        )
                    ]
                ]
            ]
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ getData GetData
        ]
