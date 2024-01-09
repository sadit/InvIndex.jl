# This file is part of InvertedFiles.jl

struct WeightedInvFileOutput{InvFileType<:WeightedInvertedFile}
    idx::InvFileType
    res::KnnResult
end

function Intersections.onmatch!(output::WeightedInvFileOutput, L, P, m::Int)
    @inbounds w = 1.0 - L[1].weight * L[1].list[P[1]].weight
    @inbounds objID = L[1].list[P[1]].id
    @inbounds @simd for i in 2:m
        w -= L[i].weight * L[i].list[P[i]].weight
    end

    push_item!(output.res, IdWeight(objID, w))
end

"""
  search_invfile(accept_posting_list::Function, idx::WeightedInvertedFile, ctx::InvertedFileContext, q, res::KnnResult, t)

Find candidates for solving query `Q` using `idx`. It calls `callback` on each candidate `(objID, dist)`

# Arguments:
- `accept_posting_list`: predicate to accept or reject a posting list
- `idx`: inverted index
- `Q`: the set of involved posting lists, see [`select_posting_lists`](@ref)
"""
function search_invfile(idx::WeightedInvertedFile, ctx::InvertedFileContext, Q::Vector{PostType}, res::KnnResult, t) where {PostType<:PostingList}
    P = getpositions(length(Q), ctx)
    cost = xmerge!(WeightedInvFileOutput(idx, res), Q, P; t)
    SearchResult(res, cost)
end
